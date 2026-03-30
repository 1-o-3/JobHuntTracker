"use client";

import { useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import { 
  format, addMonths, subMonths, addWeeks, subWeeks, 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, addDays, parseISO
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';

export default function Calendar({ onEditTask }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month' or 'week'
  const { tasks } = useTasks();

  const nextPeriod = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    else setCurrentDate(addWeeks(currentDate, 1));
  };

  const prevPeriod = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    else setCurrentDate(subWeeks(currentDate, 1));
  };

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <CalIcon color="var(--accent-primary)" />
          {format(currentDate, 'yyyy年 M月', { locale: ja })}
        </h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
        const dayTasks = tasks.filter(t => t.date && isSameDay(parseISO(t.date), cloneDay));

        days.push(
          <div
            key={day}
            style={{
              height: view === 'month' ? '120px' : '300px',
              overflowY: 'auto',
              padding: '0.5rem',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              background: isSameDay(day, new Date()) ? 'rgba(234, 179, 8, 0.15)' : (!isSameMonth(day, monthStart) && view === 'month' ? 'var(--surface)' : 'var(--surface-solid)'),
              opacity: !isSameMonth(day, monthStart) && view === 'month' ? 0.6 : 1,
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
                const timeStr = format(parseISO(task.date), "HH:mm");
                const nameStr = task.title || task.companyName;
                const iconStr = task.icon || '';
                
                let displayString = null;
                if (formatMode === 'all') {
                  displayString = (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {iconStr && <span>{iconStr}</span>} <span>{timeStr}</span>
                      </div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nameStr}</div>
                    </div>
                  );
                } else if (formatMode === 'icon_time') {
                  displayString = <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>{iconStr && <span>{iconStr}</span>} <span>{timeStr}</span></div>;
                } else if (formatMode === 'name_time') {
                  displayString = (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ fontWeight: 600 }}>{timeStr}</div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nameStr}</div>
                    </div>
                  );
                } else if (formatMode === 'icon_only') {
                  displayString = <div style={{ textAlign: 'center' }}>{iconStr}</div>;
                } else if (formatMode === 'name_only') {
                  displayString = <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nameStr}</div>;
                }

                return (
                <div 
                  key={task.id}
                  onClick={() => onEditTask(task)}
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
    <div className="calendar" style={{ background: 'var(--surface-solid)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
}
