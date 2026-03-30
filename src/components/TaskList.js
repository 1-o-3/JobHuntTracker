"use client";

import { useTasks } from '@/context/TaskContext';
import { isAfter, startOfDay, parseISO, format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Briefcase, Calendar as CalIcon, MapPin, ExternalLink, Clock, User, CheckCircle2 } from 'lucide-react';

export default function TaskList({ onEditTask }) {
  const { tasks } = useTasks();

  // Filter tasks to only include those happening from today onwards
  const today = startOfDay(new Date());
  
  const upcomingTasks = tasks.filter(task => {
    if (!task.date) return true; // Show tasks without date?
    const taskDate = startOfDay(parseISO(task.date));
    return isAfter(taskDate, today) || taskDate.getTime() === today.getTime();
  }).sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  const categories = ["説明会", "審査", "インターンシップ", "採用審査", "内定"];

  return (
    <div className="task-list">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CheckCircle2 color="var(--accent-primary)" />
        直近のタスク
      </h2>
      
      {categories.map(category => {
        const categoryTasks = upcomingTasks.filter(t => t.category === category);
        if (categoryTasks.length === 0) return null;

        return (
          <div key={category} style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              {category}
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {categoryTasks.map(task => (
                <div 
                  key={task.id} 
                  style={{ 
                    borderLeft: `4px solid ${task.color || 'var(--accent-primary)'}`,
                    padding: '1rem',
                    background: 'var(--surface)',
                    borderRadius: '0.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  onClick={() => onEditTask(task)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{task.title || `${task.companyName} ${task.category}`}</h4>
                    {task.date && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CalIcon size={14} />
                        {format(parseISO(task.date), "M月d日(E) HH:mm", { locale: ja })}
                      </span>
                    )}
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {task.companyName && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Briefcase size={14} /> {task.companyName}</div>
                    )}
                    {task.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={14} /> 
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.location)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                          {task.location}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {upcomingTasks.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>
          直近のタスクはありません。
        </div>
      )}
    </div>
  );
}
