"use client";

import { useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import { Plus, X, Calendar as CalIcon, MapPin, Link, Clock, Briefcase, FileText, LogIn, LogOut } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Calendar from '@/components/Calendar';
import TaskList from '@/components/TaskList';
import TaskFormModal from '@/components/TaskFormModal';
import SettingsModal from '@/components/SettingsModal';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { isLoaded } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  if (status === "loading" || !isLoaded) return null;

  if (!session) {
    return (
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
        <h1 className="header-title" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Job Hunt Tracker</h1>
        <div className="glass card" style={{ padding: '3rem', maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>利用を開始する</h2>
          <button 
            onClick={() => signIn('google')} 
            className="btn-primary" 
            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', padding: '1rem' }}
          >
            <LogIn size={24} />
            Googleでログイン
          </button>
        </div>
      </div>
    );
  }

  const openNewModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="header-title" style={{ margin: 0 }}>Job Hunt Tracker</h1>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.5rem' }}>
              {session.user?.image && <img src={session.user.image} alt="👤" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />}
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{session.user?.name}</span>
            </div>
            <button 
              onClick={() => setIsSettingsOpen(true)} 
              className="btn-secondary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)' }}
            >
              ⚙️ 設定
            </button>
            <button 
              onClick={() => signOut()} 
              className="btn-secondary" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', padding: '0.6rem' }}
              title="ログアウト"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-grid glass card">
        {/* Left Column: Calendar */}
        <div className="calendar-section">
          <Calendar onEditTask={openEditModal} />
        </div>

        {/* Right Column: Upcoming Tasks */}
        <div className="tasks-section">
          <TaskList onEditTask={openEditModal} />
        </div>
      </main>

      <button className="fab" onClick={openNewModal}>
        <Plus size={24} />
      </button>

      {isModalOpen && (
        <TaskFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          task={editingTask} 
        />
      )}
      {isSettingsOpen && (
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      )}
    </div>
  );
}
