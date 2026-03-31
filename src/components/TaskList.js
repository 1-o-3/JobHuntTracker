"use client";

import { useTasks } from '@/context/TaskContext';
import { isAfter, startOfDay, parseISO, format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Briefcase, Calendar as CalIcon, MapPin, Clock, CheckSquare, ExternalLink, CheckCircle2, ListTodo } from 'lucide-react';
import TaskIcon, { ICONS } from './TaskIcon';

export default function TaskList({ onEditTask }) {
  const { tasks, categoryGroups, updateTask } = useTasks();

  const ensureDate = (dateVal) => {
    if (!dateVal) return null;
    if (dateVal instanceof Date) return dateVal;
    try { return parseISO(dateVal); } catch (e) { return new Date(dateVal); }
  };

  const today = startOfDay(new Date());
  const nowMs = today.getTime();
  const yesterdayMs = addDays(today, -1).getTime();
  const weekMs = addDays(today, 7).getTime();
  const twoWeeksMs = addDays(today, 14).getTime();

  const scheduleCategories = categoryGroups?.schedule || ['説明会', 'インターンシップ', '内定'];
  const taskCategories = categoryGroups?.task || ['審査', '採用審査'];

  // All upcoming from today (including those from yesterday just to be safe with timezone)
  const allUpcoming = tasks.filter(task => {
    const d = ensureDate(task.date || task.deadline);
    if (!d) return true;
    const taskDayMs = startOfDay(d).getTime();
    return taskDayMs >= yesterdayMs; // Allow "yesterday" too to avoid cutoff
  }).sort((a, b) => ensureDate(a.date || a.deadline) - ensureDate(b.date || b.deadline));

  const scheduleTasks = [];
  const taskItems = [];

  const scheduleCatList = categoryGroups?.schedule || ['説明会', 'インターンシップ', '内定'];
  const taskCatList = categoryGroups?.task || ['審査', '採用審査'];

  allUpcoming.forEach(task => {
    const d = ensureDate(task.date || task.deadline);
    if (!d) return; 

    const taskTime = startOfDay(d).getTime();
    const category = (task.category || '').trim();
    
    const isExplicitTask = taskCatList.includes(category);
    const isExplicitSchedule = scheduleCatList.includes(category);

    if (isExplicitTask) {
      if (taskTime <= twoWeeksMs) taskItems.push(task);
    } else if (isExplicitSchedule) {
      if (taskTime <= weekMs) scheduleTasks.push(task);
    } else {
      // Fallback: If unknown category, put in schedule if near
      if (taskTime <= weekMs) scheduleTasks.push(task);
    }
  });

  const toggleTodo = (task, itemId) => {
    if (!task || !task.id) return;
    
    const now = new Date();
    const ts = format(now, "yyyy/MM/dd HH:mm");
    
    const newTodoList = (Array.isArray(task.todoList) ? task.todoList : []).map(t => {
      if (t.id === itemId) {
        const nextDone = !t.done;
        return { ...t, done: nextDone, doneAt: nextDone ? ts : null };
      }
      return t;
    });

    updateTask(task.id, { todoList: newTodoList });
  };

  const renderTodoList = (task) => {
    const todoList = task.todoList;
    if (!todoList) return null;
    let items = [];
    if (Array.isArray(todoList)) {
      items = todoList.filter(t => t.text && t.text.trim() !== '');
    } else if (typeof todoList === 'string') {
      items = todoList.split('\n').filter(t => t.trim() !== '').map((t, i) => ({ id: i, text: t.replace(/^[-・]\s*/, ''), done: false, memo: '' }));
    }
    if (items.length === 0) return null;
    return (
      <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {items.map((item, i) => {
          const isMemoUrl = item.memo && (item.memo.startsWith('http://') || item.memo.startsWith('https://'));
          return (
            <div key={item.id || i} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTodo(task, item.id);
                  }}
                  style={{ width: '0.9rem', height: '0.9rem', borderRadius: '3px', border: `2px solid ${item.done ? 'var(--accent-primary)' : 'var(--border)'}`, background: item.done ? 'var(--accent-primary)' : 'transparent', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                >
                  {item.done && <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize: '0.9rem', textDecoration: item.done ? 'line-through' : 'none', opacity: item.done ? 0.5 : 1, flex: 1 }}>{item.text}</span>
                {item.done && item.doneAt && (
                   <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', opacity: 0.8 }}>✓ {item.doneAt}</span>
                )}
              </div>
              {item.memo && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '1.4rem' }}>
                  {isMemoUrl
                    ? <a 
                        href={item.memo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <ExternalLink size={11} />{item.memo}
                      </a>
                    : item.memo
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderScheduleCard = (task) => (
    <div
      key={task.id}
      style={{ borderLeft: `4px solid ${task.color || 'var(--accent-primary)'}`, padding: '1rem', background: 'var(--surface)', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'transform 0.2s ease' }}
      onClick={() => onEditTask(task)}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {Object.keys(ICONS).includes(task.icon) ? <TaskIcon name={task.icon} size={16} /> : task.icon ? <span>{task.icon}</span> : null}
          {task.title || `${task.companyName} ${task.category}`}
        </h4>
        {(task.date || task.deadline) && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', background: 'var(--bg)', borderRadius: '1rem', border: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
            <Clock size={12} />
            {format(ensureDate(task.date || task.deadline), "M/d(E)", { locale: ja })}
            {' '}
            {task.time ? task.time.split('|')[0] : (task.date ? format(ensureDate(task.date), "HH:mm") : '')}
          </span>
        )}
      </div>
      <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)' }}><Briefcase size={13} />{task.companyName || '---'}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)' }}><MapPin size={13} />{task.location || '未設定'}</span>
      </div>
    </div>
  );

  const renderTaskCard = (task) => {
    const todoList = renderTodoList(task);
    return (
      <div
        key={task.id}
        style={{ borderLeft: `4px solid ${task.color || '#f59e0b'}`, padding: '1rem', background: 'var(--surface)', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'transform 0.2s ease' }}
        onClick={() => onEditTask(task)}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
            {task.companyName && task.title ? `${task.companyName}｜${task.title}` : task.title || task.companyName || '（タイトルなし）'}
          </h4>
          {(task.date || task.deadline) && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', background: 'var(--bg)', borderRadius: '1rem', border: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
              <Clock size={12} />
              {format(ensureDate(task.date || task.deadline), "M/d(E)", { locale: ja })}
              {' '}
              {task.time ? task.time.split('|')[0] : (task.date ? format(ensureDate(task.date), "HH:mm") : '')}
            </span>
          )}
        </div>
        {todoList}
      </div>
    );
  };

  return (
    <div className="task-list">
      {/* ── スケジュール セクション ── */}
      <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CheckCircle2 color="var(--accent-primary)" size={22} />
        直近のスケジュール
      </h2>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {scheduleTasks.length > 0 ? (
          scheduleTasks.map(renderScheduleCard)
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0', fontSize: '0.9rem' }}>
            直近のスケジュールはありません
          </div>
        )}
      </div>

      {/* ── タスク セクション ── */}
      <h2 style={{ fontSize: '1.4rem', margin: '2rem 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <ListTodo color="#f59e0b" size={22} />
        タスク一覧
      </h2>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {taskItems.length > 0 ? (
          taskItems.map(renderTaskCard)
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0', fontSize: '0.9rem' }}>
            タスクはありません
          </div>
        )}
      </div>
    </div>
  );
}
