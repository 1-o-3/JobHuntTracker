"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [siteHistory, setSiteHistory] = useState([]);
  const [colorLabels, setColorLabels] = useState({});

  useEffect(() => {
    // Only load if authenticated
    if (status === 'unauthenticated') {
      setIsLoaded(true);
      setTasks([]);
      return;
    }
    
    if (status === 'authenticated' && session?.user?.id) {
      const userId = session.user.id;
      
      // Load user-specific color labels and site history from localStorage
      const savedHistory = localStorage.getItem(`jobHuntSiteHistory_${userId}`);
      if (savedHistory) {
        try { setSiteHistory(JSON.parse(savedHistory)); } catch (e) { }
      } else {
        setSiteHistory([]);
      }
      
      const savedColorLabels = localStorage.getItem(`jobHuntColorLabels_${userId}`);
      if (savedColorLabels) {
        try { setColorLabels(JSON.parse(savedColorLabels)); } catch (e) { }
      } else {
        setColorLabels({});
      }

      // Fetch tasks from Database!
      fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setTasks(data);
          }
          setIsLoaded(true);
        })
        .catch(err => {
          console.error("Failed to load tasks from DB", err);
          setIsLoaded(true);
        });
    }
  }, [status, session]);

  const addTask = async (task) => {
    // Generate a temporary ID so UI updates instantly
    const tempId = Date.now().toString();
    const newTask = { ...task, id: tempId };
    setTasks(prev => [...prev, newTask]);

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      if (res.ok) {
        const dbTask = await res.json();
        // Replace temporary task with the real one from DB
        setTasks(prev => prev.map(t => t.id === tempId ? dbTask : t));
      } else {
        // Rollback on failure
        setTasks(prev => prev.filter(t => t.id !== tempId));
        console.error("Failed to save task to DB");
      }
    } catch (e) {
      setTasks(prev => prev.filter(t => t.id !== tempId));
      console.error(e);
    }
  };

  const updateTask = async (id, updated) => {
    // Optimistic UI Update
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (!res.ok) throw new Error("Update failed");
      
      const dbTask = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? dbTask : t));
    } catch (e) {
      console.error(e);
      setTasks(previousTasks); // Rollback
    }
  };

  const deleteTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== id));

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Delete failed");
    } catch (e) {
      console.error(e);
      setTasks(previousTasks); // Rollback
    }
  };

  const addSiteToHistory = (site) => {
    if (!site || siteHistory.includes(site) || !session?.user?.id) return;
    const newHistory = [...siteHistory, site];
    setSiteHistory(newHistory);
    localStorage.setItem(`jobHuntSiteHistory_${session.user.id}`, JSON.stringify(newHistory));
  };

  const removeSiteFromHistory = (site) => {
    if (!session?.user?.id) return;
    const newHistory = siteHistory.filter(s => s !== site);
    setSiteHistory(newHistory);
    localStorage.setItem(`jobHuntSiteHistory_${session.user.id}`, JSON.stringify(newHistory));
  };

  const updateColorLabel = (color, label) => {
    if (!session?.user?.id) return;
    setColorLabels(prev => {
      const newLabels = { ...prev, [color]: label };
      localStorage.setItem(`jobHuntColorLabels_${session.user.id}`, JSON.stringify(newLabels));
      return newLabels;
    });
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, addTask, updateTask, deleteTask, isLoaded,
      siteHistory, addSiteToHistory, removeSiteFromHistory,
      colorLabels, updateColorLabel
    }}>
      {children}
    </TaskContext.Provider>
  );
};
