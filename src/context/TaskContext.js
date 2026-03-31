"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { addDays, addWeeks, addMonths, isWeekend, getDay, setDay } from 'date-fns';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [siteHistory, setSiteHistory] = useState([]);
  const [colorLabels, setColorLabels] = useState({});
  const defaultCategoryGroups = {
    schedule: ['説明会', 'インターンシップ', '内定'],
    task: ['審査', '採用審査']
  };
  const [categoryGroups, setCategoryGroups] = useState(defaultCategoryGroups);
  const [iconColors, setIconColors] = useState({});
  const [homeAddress, setHomeAddress] = useState('');

  // Flat list for backward compatibility
  const categories = [...(categoryGroups.schedule || []), ...(categoryGroups.task || [])];

  const fetchTasks = useCallback(async () => {
    if (status !== 'authenticated' || !session?.user?.id) return;
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (err) {
      console.error('Failed to load tasks from DB', err);
    }
  }, [status, session]);

  // Save multiple settings at once
  const bulkSaveSettings = async (settingsObj) => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsObj),
      });
    } catch (e) {
      console.error('Failed to save bulk settings:', e);
    }
  };

  // Save a single settings key to DB
  const saveSettings = (key, value) => bulkSaveSettings({ [key]: value });

  useEffect(() => {
    if (status === 'unauthenticated') {
      setIsLoaded(true);
      setTasks([]);
      return;
    }

    if (status === 'authenticated' && session?.user?.id) {
      const userId = session.user.id;

      // Load settings from DB
      fetch('/api/settings')
        .then(res => res.ok ? res.json() : {})
        .then(dbSettings => {
          // If DB has no settings yet, migrate from localStorage (first-time cross-device setup)
          const needsMigration = !dbSettings || Object.keys(dbSettings).length === 0;
          const migrated = {};

          if (needsMigration) {
            const lsHistory = localStorage.getItem(`jobHuntSiteHistory_${userId}`);
            if (lsHistory) try { migrated.siteHistory = JSON.parse(lsHistory); } catch (e) {}
            const lsColors = localStorage.getItem(`jobHuntColorLabels_${userId}`);
            if (lsColors) try { migrated.colorLabels = JSON.parse(lsColors); } catch (e) {}
            const lsGroups = localStorage.getItem(`jobHuntCategoryGroups_${userId}`);
            if (lsGroups) try { migrated.categoryGroups = JSON.parse(lsGroups); } catch (e) {}
            const lsIconColors = localStorage.getItem(`jobHuntIconColors_${userId}`);
            if (lsIconColors) try { migrated.iconColors = JSON.parse(lsIconColors); } catch (e) {}
            const lsHome = localStorage.getItem(`jobHuntHomeAddress_${userId}`);
            if (lsHome) migrated.homeAddress = lsHome;
            // Old flat categories format
            if (!migrated.categoryGroups) {
              const lsCats = localStorage.getItem(`jobHuntCategories_${userId}`);
              if (lsCats) try {
                const flat = JSON.parse(lsCats);
                if (Array.isArray(flat)) migrated.categoryGroups = { schedule: flat, task: [] };
              } catch (e) {}
            }
            if (Object.keys(migrated).length > 0) {
              // Save migrated data to DB then clear localStorage
              fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(migrated) });
            }
          }

          const s = needsMigration ? { ...dbSettings, ...migrated } : dbSettings;
          if (s.siteHistory) setSiteHistory(s.siteHistory);
          if (s.colorLabels) setColorLabels(s.colorLabels);
          if (s.categoryGroups) setCategoryGroups(s.categoryGroups);
          if (s.iconColors) setIconColors(s.iconColors);
          if (s.homeAddress) setHomeAddress(s.homeAddress);
        })
        .catch(e => console.error('Failed to load settings:', e));

      fetchTasks().then(() => setIsLoaded(true));
    }
  }, [status, session, fetchTasks]);

  const addTask = async (task) => {
    const repeat = task.repeat || 'none';
    const repeatEndMode = task.repeatEndMode || 'count';
    const repeatCount = parseInt(task.repeatCount) || 1;
    const repeatEndDate = task.repeatEndDate ? new Date(task.repeatEndDate) : null;
    const monthlyMode = task.monthlyMode || 'date';
    
    const tasksToAdd = [];
    if (repeat === 'none') {
      tasksToAdd.push({ ...task });
    } else {
      let currentDate = task.date ? new Date(task.date) : new Date();
      const startDayOfWeek = getDay(currentDate); 
      
      const repeatGroupId = Date.now().toString() + Math.random();
      let count = 0;
      const MAX_SAFE_LOOP = 100;
      
      while (true) {
        if (repeatEndMode === 'count' && count >= repeatCount) break;
        if (repeatEndMode === 'date' && repeatEndDate && currentDate > repeatEndDate) break;
        if (count >= MAX_SAFE_LOOP) break; 

        if (repeat === 'weekdays' && isWeekend(currentDate)) {
           currentDate = addDays(currentDate, 1);
           continue; 
        }

        const newTaskInstance = { ...task, date: new Date(currentDate), repeatGroupId };
        const fieldsToRemove = ['repeat', 'repeatEndMode', 'repeatCount', 'repeatEndDate', 'monthlyMode'];
        fieldsToRemove.forEach(f => delete newTaskInstance[f]);
        
        if (task.zoomId) newTaskInstance.zoomId = task.zoomId;
        if (task.zoomPassword) newTaskInstance.zoomPassword = task.zoomPassword;

        tasksToAdd.push(newTaskInstance);
        count++;

        if (repeat === 'daily' || repeat === 'weekdays') {
          currentDate = addDays(currentDate, 1);
        } else if (repeat === 'weekly') {
          currentDate = addWeeks(currentDate, 1);
        } else if (repeat === 'monthly') {
          if (monthlyMode === 'date') {
            currentDate = addMonths(currentDate, 1);
          } else {
            currentDate = addMonths(currentDate, 1);
            currentDate = setDay(currentDate, startDayOfWeek);
          }
        }
      }
    }

    for (const t of tasksToAdd) {
      const tempId = Date.now().toString() + Math.random();
      const newTask = { ...t, id: tempId };
      setTasks(prev => [...prev, newTask]);

      try {
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(t)
        });
        if (res.ok) {
          const dbTask = await res.json();
          setTasks(prev => prev.map(item => item.id === tempId ? dbTask : item));
        } else {
          setTasks(prev => prev.filter(item => item.id !== tempId));
        }
      } catch (e) {
        setTasks(prev => prev.filter(item => item.id !== tempId));
      }
    }
  };

  const updateTask = async (id, updated) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (!res.ok) {
        setTasks(previousTasks);
        return;
      }
      const dbTask = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...dbTask } : t));
      fetchTasks();
    } catch (e) {
      setTasks(previousTasks);
    }
  };

  const updateFutureTasks = async (groupId, fromDate, updatedFields) => {
    const previousTasks = tasks;
    const fieldsToApply = { ...updatedFields };

    let shiftMs = 0;
    const newDateVal = updatedFields.date || updatedFields.deadline;
    if (newDateVal && fromDate) {
      shiftMs = new Date(newDateVal).getTime() - new Date(fromDate).getTime();
    }

    const targetDate = new Date(fromDate);
    const tasksToUpdate = tasks.filter(t => 
      t.repeatGroupId === groupId && 
      (new Date(t.date || t.deadline) >= targetDate)
    );

    if (tasksToUpdate.length === 0) return;
    const targetIds = tasksToUpdate.map(t => t.id);

    // 1. Optimistic UI Update
    setTasks(prev => prev.map(t => {
      if (targetIds.includes(t.id)) {
        const updated = { ...t, ...fieldsToApply };
        if (shiftMs !== 0) {
          if (t.date) updated.date = new Date(new Date(t.date).getTime() + shiftMs).toISOString();
          if (t.deadline) updated.deadline = new Date(new Date(t.deadline).getTime() + shiftMs).toISOString();
        }
        return updated;
      }
      return t;
    }));

    try {
      // 2. Persist to API
      const updatePromises = tasksToUpdate.map(targetTask => {
        const apiPayload = { ...fieldsToApply };
        delete apiPayload.id;
        delete apiPayload.userId;
        delete apiPayload.createdAt;
        delete apiPayload.updatedAt;

        if (shiftMs !== 0) {
          if (targetTask.date) {
            apiPayload.date = new Date(new Date(targetTask.date).getTime() + shiftMs).toISOString();
          }
          if (targetTask.deadline) {
            apiPayload.deadline = new Date(new Date(targetTask.deadline).getTime() + shiftMs).toISOString();
          }
        }

        return fetch(`/api/tasks/${targetTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(apiPayload)
        });
      });

      await Promise.all(updatePromises);
      fetchTasks();
    } catch (e) {
      console.error("Batch update failed:", e);
      setTasks(previousTasks);
    }
  };

  const deleteTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== id));
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    } catch (e) {
      setTasks(previousTasks);
    }
  };

  const deleteFutureTasks = async (groupId, fromDate) => {
    const targetDate = new Date(fromDate);
    const tasksToRemove = tasks.filter(t => 
      t.repeatGroupId === groupId && 
      (t.date ? new Date(t.date) >= targetDate : true)
    );
    if (tasksToRemove.length === 0) return;

    const previousTasks = [...tasks];
    const idsToRemove = tasksToRemove.map(t => t.id);
    setTasks(prev => prev.filter(t => !idsToRemove.includes(t.id)));

    try {
      for (const id of idsToRemove) {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      }
      fetchTasks();
    } catch (e) {
      setTasks(previousTasks);
    }
  };

  const updateColorLabel = (color, label) => {
    if (!session?.user?.id) return;
    const newLabels = { ...colorLabels, [color]: label };
    setColorLabels(newLabels);
    saveSettings('colorLabels', newLabels);
  };

  const updateAllColorLabels = (allLabels) => {
    if (!session?.user?.id) return;
    setColorLabels(allLabels);
    saveSettings('colorLabels', allLabels);
  };

  const updateCategories = (newGroups) => {
    if (!session?.user?.id) return;
    setCategoryGroups(newGroups);
    saveSettings('categoryGroups', newGroups);
  };

  const renameCategoryInTasks = async (oldName, newName) => {
    if (!oldName || !newName || oldName === newName) return;
    const affected = tasks.filter(t => t.category === oldName);
    if (affected.length === 0) return;
    setTasks(prev => prev.map(t => t.category === oldName ? { ...t, category: newName } : t));
    await Promise.all(affected.map(t =>
      fetch(`/api/tasks/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: newName })
      })
    ));
    fetchTasks();
  };

  const getCategoriesInUse = () => {
    return new Set(tasks.map(t => t.category).filter(Boolean));
  };

  const updateIconColor = (iconName, color) => {
    if (!session?.user?.id) return;
    const newColors = { ...iconColors, [iconName]: color };
    setIconColors(newColors);
    saveSettings('iconColors', newColors);
  };

  const updateAllIconColors = (allColors) => {
    if (!session?.user?.id) return;
    setIconColors(allColors);
    saveSettings('iconColors', allColors);
  };

  const updateHomeAddress = (address) => {
    if (!session?.user?.id) return;
    setHomeAddress(address);
    saveSettings('homeAddress', address);
  };

  const addSiteToHistoryUpdated = (site) => {
    if (!site || siteHistory.includes(site) || !session?.user?.id) return;
    const newHistory = [...siteHistory, site];
    setSiteHistory(newHistory);
    saveSettings('siteHistory', newHistory);
  };

  const removeSiteFromHistoryUpdated = (site) => {
    if (!session?.user?.id) return;
    const newHistory = siteHistory.filter(s => s !== site);
    setSiteHistory(newHistory);
    saveSettings('siteHistory', newHistory);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, fetchTasks, addTask, updateTask, updateFutureTasks, deleteTask, deleteFutureTasks, isLoaded,
      siteHistory, addSiteToHistory: addSiteToHistoryUpdated, removeSiteFromHistory: removeSiteFromHistoryUpdated,
      colorLabels, updateColorLabel, updateAllColorLabels,
      categories, categoryGroups, updateCategories, renameCategoryInTasks, getCategoriesInUse,
      iconColors, updateIconColor, updateAllIconColors,
      homeAddress, updateHomeAddress
    }}>
      {children}
    </TaskContext.Provider>
  );
};
