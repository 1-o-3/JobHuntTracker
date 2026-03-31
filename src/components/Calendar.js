"use client";

import { useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import { 
  format, addMonths, subMonths, addWeeks, subWeeks, 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, isBefore, startOfDay, addDays, parseISO
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Copy, X, Clock, Plus } from 'lucide-react';
import TaskIcon, { ICONS } from './TaskIcon';

export default function Calendar({ onEditTask }) {
  const { tasks, addTask } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month' or 'week'
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [detailDay, setDetailDay] = useState(null); // Day to show in the details modal

  // Utility to handle both ISO strings and Date objects correctly
  const ensureDate = (dateVal) => {
    if (!dateVal) return null;
    if (dateVal instanceof Date) return dateVal;
    try {
      return parseISO(dateVal);
    } catch (e) {
      return new Date(dateVal);
    }
  };

  const nextPeriod = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    else setCurrentDate(addWeeks(currentDate, 1));
  };

  const prevPeriod = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    else setCurrentDate(subWeeks(currentDate, 1));
  };

  const toggleCopyMode = () => {
    setIsCopyMode(!isCopyMode);
    setSelectedTasks([]);
  };

  const handleTaskClick = (e, task) => {
    e.stopPropagation();
    if (isCopyMode) {
      if (selectedTasks.find(t => t.id === task.id)) {
        setSelectedTasks(selectedTasks.filter(t => t.id !== task.id));
      } else {
        setSelectedTasks([...selectedTasks, task]);
      }
    } else {
      onEditTask(task);
    }
  };

  const handleDayClick = (day) => {
    if (isCopyMode && selectedTasks.length > 0) {
      if (window.confirm(`${selectedTasks.length}件の予定を ${format(day, 'M月d日')} にコピーしますか？`)) {
        selectedTasks.forEach(task => {
          const newTask = { ...task };
          delete newTask.id; // API creates new CUID
          delete newTask.repeatGroupId; // Copying should create an independent task
          newTask.date = day.toISOString(); 
          addTask(newTask); 
        });
        setIsCopyMode(false);
        setSelectedTasks([]);
      }
    } else if (!isCopyMode) {
      setDetailDay(day);
    }
  };

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <CalIcon color="var(--accent-primary)" />
          {format(currentDate, 'yyyy年 M月', { locale: ja })}
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button 
            onClick={toggleCopyMode} 
            className={`btn-secondary ${isCopyMode ? 'copy-selected' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: isCopyMode ? 'var(--accent-primary)' : 'var(--surface)', color: isCopyMode ? '#fff' : 'var(--text-main)', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}
          >
            <Copy size={18} /> {isCopyMode ? 'コピー先をクリック' : 'コピーモード'}
          </button>
          <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <button 
              onClick={() => setView('month')}
              style={{
                padding: '0.5rem 1rem',
                background: view === 'month' ? 'var(--accent-primary)' : 'transparent',
                color: view === 'month' ? 'white' : 'var(--text-main)',
                border: 'none',
                fontWeight: 600
              }}
            >月</button>
            <button 
              onClick={() => setView('week')}
              style={{
                padding: '0.5rem 1rem',
                background: view === 'week' ? 'var(--accent-primary)' : 'transparent',
                color: view === 'week' ? 'white' : 'var(--text-main)',
                border: 'none',
                fontWeight: 600
              }}
            >週</button>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button onClick={prevPeriod} className="btn-secondary" style={{ padding: '0.5rem' }}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextPeriod} className="btn-secondary" style={{ padding: '0.5rem' }}>
              <ChevronRight size={20} />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              今日
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const dateFormat = "E";
    const days = [];
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} style={{ textAlign: 'center', fontWeight: 'bold', padding: '0.5rem', color: 'var(--text-muted)' }}>
          {format(addDays(startDate, i), dateFormat, { locale: ja })}
        </div>
      );
    }

    return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--border)' }}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(view === 'month' ? monthStart : currentDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(view === 'month' ? monthEnd : currentDate, { weekStartsOn: 1 });

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = new Date(day);

        // Get tasks for this day
        const dayTasks = tasks.filter(t => {
          if (!t.date) return false;
          const d = ensureDate(t.date);
          return d && isSameDay(d, cloneDay);
        });

        days.push(
          <div
            key={day}
            onClick={() => handleDayClick(cloneDay)}
            style={{
              height: view === 'month' ? '120px' : '300px',
              overflowY: 'auto',
              padding: '0.5rem',
              borderRight: i < 6 ? '1px solid var(--border)' : 'none',
              borderBottom: '1px solid var(--border)',
              background: isSameDay(day, new Date()) ? 'rgba(234, 179, 8, 0.15)' : (!isSameMonth(day, monthStart) && view === 'month' ? 'var(--surface)' : 'var(--surface-solid)'),
              opacity: (() => {
                const isPast = isBefore(startOfDay(day), startOfDay(new Date())) && !isSameDay(day, new Date());
                const isOtherMonth = !isSameMonth(day, monthStart) && view === 'month';
                if (isPast && isOtherMonth) return 0.25;
                if (isPast) return 0.4;
                if (isOtherMonth) return 0.7;
                return 1;
              })(),
              cursor: isCopyMode ? 'pointer' : 'default'
            }}
          >
            <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '50%',
                background: isSameDay(day, new Date()) ? 'var(--accent-primary)' : 'transparent',
                color: isSameDay(day, new Date()) ? 'white' : 'inherit',
                fontWeight: isSameDay(day, new Date()) ? 'bold' : 'normal',
              }}>
                {formattedDate}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {dayTasks.map(task => {
                const formatMode = task.displayFormat || 'all';
                const taskDate = ensureDate(task.date);
                
                // Get display time: prefer task.time (string) over task.date's internal hours
                let timeStr = '00:00';
                if (task.time) {
                  timeStr = task.time.split('|')[0];
                } else if (taskDate) {
                  timeStr = format(taskDate, "HH:mm");
                }
                
                const nameStr = task.title || task.companyName;
                const iconStr = task.icon || '';
                const renderedIcon = Object.keys(ICONS).includes(iconStr) ? <TaskIcon name={iconStr} size={14} /> : <span>{iconStr}</span>;
                
                let displayString = null;
                if (formatMode === 'all') {
                  displayString = (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {iconStr && renderedIcon} <span>{timeStr}</span>
                      </div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nameStr}</div>
                    </div>
                  );
                } else if (formatMode === 'icon_time') {
                  displayString = <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>{iconStr && renderedIcon} <span>{timeStr}</span></div>;
                } else if (formatMode === 'name_time') {
                  displayString = (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ fontWeight: 600 }}>{timeStr}</div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nameStr}</div>
                    </div>
                  );
                } else if (formatMode === 'icon_name') {
                  displayString = (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {iconStr && renderedIcon} 
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nameStr}</div>
                    </div>
                  );
                } else if (formatMode === 'icon_only') {
                  displayString = <div style={{ textAlign: 'center' }}>{iconStr ? renderedIcon : null}</div>;
                } else if (formatMode === 'name_only') {
                  displayString = <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nameStr}</div>;
                }

                return (
                <div 
                  key={task.id}
                  onClick={(e) => handleTaskClick(e, task)}
                  className={selectedTasks.find(t => t.id === task.id) ? 'copy-selected' : ''}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    background: `${task.color}22` || 'var(--surface)',  // Color with opacity
                    color: 'var(--text-main)',
                    borderLeft: `3px solid ${task.color || 'var(--accent-primary)'}`,
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                  title={task.title || task.companyName}
                >
                  {displayString}
                </div>
              )})}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="calendar" style={{ background: 'transparent' }}>
      {renderHeader()}
      <div className="calendar-table-container" style={{ overflowX: 'auto', paddingBottom: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', minHeight: '600px' }}>
        <div style={{ minWidth: '700px', width: '100%', background: 'var(--surface-solid)' }}>
          {renderDaysOfWeek()}
          {renderCells()}
        </div>
      </div>
      
      {isCopyMode && (
        <div className="copy-badge">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>{selectedTasks.length}件を選択中</span>
            <span style={{ fontWeight: 600 }}>コピー先の日付をクリックしてください</span>
          </div>
          <button onClick={() => setIsCopyMode(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}><X size={16} /></button>
        </div>
      )}
      {/* Day Details Modal */}
      {detailDay && (
        <div className="modal-overlay" onClick={() => setDetailDay(null)} style={{ zIndex: 1100 }}>
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()} 
            style={{ 
              maxWidth: '450px', 
              width: '90%', 
              padding: '2rem',
              background: 'var(--surface-solid)',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{format(detailDay, 'M月d日(E)', { locale: ja })} の予定</h2>
              <button 
                onClick={() => setDetailDay(null)} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(() => {
                const dayTasks = tasks.filter(t => {
                  const d = ensureDate(t.date || t.deadline);
                  return d && isSameDay(d, detailDay);
                }).sort((a, b) => (a.time || '').localeCompare(b.time || ''));

                if (dayTasks.length === 0) {
                  return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>予定はありません</p>;
                }

                return dayTasks.map(task => (
                  <div 
                    key={task.id} 
                    onClick={() => {
                      onEditTask(task);
                      setDetailDay(null);
                    }}
                    style={{ 
                      padding: '1rem', 
                      background: 'var(--surface)', 
                      borderRadius: '0.75rem', 
                      border: `1px solid var(--border)`,
                      borderLeft: `5px solid ${task.color || 'var(--accent-primary)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                    className="task-hover"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <TaskIcon name={task.icon} size={20} color={task.color} />
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{task.companyName ? `${task.companyName} | ` : ''}{task.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Clock size={12} /> {task.time ? task.time.split('|')[0] : '時間未設定'}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: `${task.color}22`, color: task.color, borderRadius: '4px' }}>
                      {task.category}
                    </span>
                  </div>
                ));
              })()}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
               <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                onClick={() => {
                  // This is tricky because Dashboard usually handles "New Task" without date
                  // But we can pass a dummy task with only the date
                  onEditTask({ date: detailDay.toISOString(), category: '説明会' });
                  setDetailDay(null);
                }}
               >
                 <Plus size={20} /> 予定を追加
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
