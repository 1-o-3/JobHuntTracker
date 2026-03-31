"use client";

import { useState, useEffect } from 'react';
import { useTasks } from '@/context/TaskContext';
import { X, Save, Trash2, Plus, Edit3, Calendar as CalIcon, MapPin, Clock, Briefcase, Link as LinkIcon, CheckSquare, FileText, ExternalLink } from 'lucide-react';
import TaskIcon, { ICONS, SCHEDULE_ICON_KEYS, TASK_ICON_KEYS } from './TaskIcon';

export default function TaskFormModal({ isOpen, onClose, task }) {
  const { addTask, updateTask, updateFutureTasks, deleteTask, deleteFutureTasks, siteHistory, addSiteToHistory, removeSiteFromHistory, colorLabels, categories, categoryGroups, homeAddress } = useTasks();
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(!task?.id);
  const [showDurationOption, setShowDurationOption] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tasks } = useTasks();

  const getInitialTodoList = () => {
    if (task?.todoList) {
      if (Array.isArray(task.todoList)) return task.todoList.length > 0 ? task.todoList : [{ id: Date.now(), text: '', done: false }];
      if (typeof task.todoList === 'string') {
        const lines = task.todoList.split('\n').filter(t => t.trim() !== '');
        if (lines.length > 0) return lines.map((t, i) => ({ id: Date.now() + i, text: t.replace(/^[-・]\s*/, ''), done: false }));
      }
    }
    return [{ id: Date.now(), text: '', done: false }];
  };

  const [formData, setFormData] = useState({
    title: '',
    category: '説明会',
    companyName: '',
    date: '',
    time: '',
    endTime: '',
    duration: '', // Used for duration in minutes
    location: '',
    zoomLink: '',
    zoomId: '',
    zoomPassword: '',
    applySite: '',
    dressCode: '',
    belongings: '',
    deadline: '',
    todoList: getInitialTodoList(),
    links: '',
    memo: '',
    color: '#0ea5e9',
    icon: 'Building2',
    displayFormat: 'all',
    repeat: 'none', // none, daily, weekdays, weekly, monthly
    repeatEndMode: 'count', // count, date
    repeatCount: 1,
    repeatEndDate: '',
    monthlyMode: 'date', // date, weekday
  });

  // Determine form type based on category group
  const scheduleCategories = categoryGroups?.schedule || ['説明会', 'インターンシップ', '内定'];
  const taskCategories = categoryGroups?.task || ['審査', '採用審査'];
  const isSchedule = scheduleCategories.includes(formData.category);
  const isScreening = taskCategories.includes(formData.category);

  const calculateDuration = (start, end) => {
    if (!start || !end) return '';
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    let totalStart = sh * 60 + sm;
    let totalEnd = eh * 60 + em;
    if (totalEnd < totalStart) totalEnd += 24 * 60; // cross midnight
    return String(totalEnd - totalStart);
  };

  const calculateEndTime = (start, dur) => {
    if (!start || !dur) return '';
    const [h, m] = start.split(':').map(Number);
    const total = h * 60 + m + Number(dur);
    return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  };

  // Function to reset form from task
  const resetForm = () => {
    if (task) {
      const parsedData = { ...task };
      
      // Handle Date 
      if (task.date) {
        const d = new Date(task.date);
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        const localISOTime = (new Date(d - tzoffset)).toISOString().slice(0, -1);
        parsedData.date = localISOTime.split('T')[0];
      }

      // Handle Time Extraction (Unpack from '14:00|90' if packed)
      let defaultTime = task.time || '';
      let defaultDur = '';
      if (defaultTime.includes('|')) {
        [defaultTime, defaultDur] = defaultTime.split('|');
      }

      let defaultEndTime = '';
      if (defaultTime && defaultDur) {
        defaultEndTime = calculateEndTime(defaultTime, defaultDur);
      }

      // Helper: convert any date value to local YYYY-MM-DD string
      const toLocalDate = (val) => {
        if (!val) return '';
        const d = new Date(val);
        if (isNaN(d.getTime())) return '';
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        return (new Date(d - tzoffset)).toISOString().split('T')[0];
      };

      // Handle Date & Deadline (both may be ISO strings from DB)
      const localDate = toLocalDate(task.date);
      const localDeadline = toLocalDate(task.deadline);
      // Use whichever is available; they should be the same value after our save logic
      const bestDate = localDate || localDeadline;

      setFormData({
        title: task.title || '',
        category: task.category || '説明会',
        companyName: task.companyName || '',
        date: bestDate,
        deadline: bestDate,
        time: defaultTime,
        duration: defaultDur,
        endTime: defaultEndTime,
        location: task.location || '',
        zoomLink: task.zoomLink || '',
        zoomId: task.zoomId || '',
        zoomPassword: task.zoomPassword || '',
        applySite: task.applySite || '',
        dressCode: task.dressCode || '',
        belongings: task.belongings || '',
        todoList: getInitialTodoList(),
        links: task.links || '',
        memo: task.memo || '',
        color: task.color || '#0ea5e9',
        icon: task.icon || 'Building2',
        displayFormat: task.displayFormat || 'all',
        repeat: task.repeat || 'none',
        repeatEndMode: task.repeatEndMode || 'count',
        repeatCount: task.repeatCount || 1,
        repeatEndDate: task.repeatEndDate || '',
        monthlyMode: task.monthlyMode || 'date',
      });
    } else {
      setFormData({
        title: '',
        category: '説明会',
        companyName: '',
        date: '',
        time: '',
        endTime: '',
        duration: '',
        location: '',
        zoomLink: '',
        zoomId: '',
        zoomPassword: '',
        applySite: '',
        dressCode: '',
        belongings: '',
        deadline: '',
        todoList: [{ id: Date.now(), text: '', done: false, memo: '' }],
        links: '',
        memo: '',
        color: '#0ea5e9',
        icon: 'Building2',
        displayFormat: 'all',
        repeat: 'none',
        repeatEndMode: 'count',
        repeatCount: 1,
        repeatEndDate: '',
        monthlyMode: 'date',
      });
    }
  };

  // Extract task data on mount/change or when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
      setIsEditing(!task?.id);
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const getCategoryColor = (cat) => {
    switch (cat) {
      case '説明会': return '#0ea5e9';
      case '審査': return '#f59e0b';
      case 'インターンシップ': return '#10b981';
      case '採用審査': return '#ea580c';
      case '内定': return '#8b5cf6';
      default: return '#0ea5e9';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'category') {
        newData.color = getCategoryColor(value);
      } else if (name === 'date') {
        newData.deadline = value;
      } else if (name === 'deadline') {
        newData.date = value;
      } else if (name === 'time') {
        if (showDurationOption && newData.duration) {
           newData.endTime = calculateEndTime(value, newData.duration);
        } else if (newData.endTime) {
           newData.duration = calculateDuration(value, newData.endTime);
        }
      } else if (name === 'duration' && showDurationOption) {
        if (newData.time) {
          newData.endTime = calculateEndTime(newData.time, value);
        }
      }
      return newData;
    });
  };

  const getValidationErrors = () => {
    const errors = {};
    const baseDate = formData.date || formData.deadline;

    if (formData.time && formData.endTime && !isScreening) {
      if (formData.endTime < formData.time) {
        errors.endTime = "終了時間は開始時間以降に設定してください";
      }
    }

    if (formData.repeat !== 'none' && formData.repeatEndMode === 'date' && formData.repeatEndDate && baseDate) {
      if (formData.repeatEndDate < baseDate) {
        errors.repeatEndDate = "繰り返し終了日は開始日以降に設定してください";
      }
    }

    if (!formData.title?.trim()) errors.title = "タイトルを入力してください";
    if (!formData.companyName?.trim()) errors.companyName = "会社名を入力してください";
    if (!baseDate) errors.date = "日付を入力してください";

    // Duplicate check for SAME day, SAME title, SAME company
    if (baseDate && formData.title && formData.companyName) {
      const isDuplicate = tasks.some(t => {
        // Skip current task if editing
        if (task && t.id === task.id) return false;
        
        // Skip tasks in the SAME series (they usually shouldn't be duplicated at same day, 
        // but if they are being updated together, we shouldn't warn about them)
        if (task && task.repeatGroupId && t.repeatGroupId === task.repeatGroupId) return false;
        
        if (!t.date) return false;
        const taskDateObj = new Date(t.date);
        const taskDateStr = taskDateObj.getFullYear() + '-' + 
                           String(taskDateObj.getMonth() + 1).padStart(2, '0') + '-' + 
                           String(taskDateObj.getDate()).padStart(2, '0');
        
        return taskDateStr === baseDate && 
               (t.title || '') === (formData.title || '') && 
               (t.companyName || '') === (formData.companyName || '');
      });
      
      if (isDuplicate) {
        errors.duplicate = "同じ日に同一の予定が既に登録されています";
      }
    }

    return errors;
  };

  const errors = getValidationErrors();
  // Warnings don't block submission
  const hasErrors = Object.keys(errors).filter(k => k !== 'duplicate').length > 0;
  const hasDuplicateWarning = !!errors.duplicate;

  const getCleanFormData = (data) => {
    const cleaned = { ...data };
    const fieldsToRemove = ['repeat', 'repeatEndMode', 'repeatCount', 'repeatEndDate', 'monthlyMode', 'duration', 'endTime'];
    fieldsToRemove.forEach(f => delete cleaned[f]);
    // todoList is handled separately for comparison if needed
    cleaned.todoList = Array.isArray(cleaned.todoList) ? cleaned.todoList.map(t => t.text).join('\n') : '';
    return cleaned;
  };

  const checkIsDirty = () => {
    if (!task) return true; // Always allow saving new tasks
    
    // Simple comparison of relevant fields
    const current = { ...formData };
    
    // Normalize task data for comparison
    const initial = { ...task };
    const fieldsToCompare = ['title', 'companyName', 'category', 'location', 'zoomLink', 'zoomId', 'zoomPassword', 'applySite', 'dressCode', 'belongings', 'memo', 'links'];
    
    for (const field of fieldsToCompare) {
      if ((current[field] || '') !== (initial[field] || '')) return true;
    }

    // Compare fields that have defaults (must compare against same default)
    const colorDefault = '#0ea5e9';
    const iconDefault = 'Building2';
    const displayDefault = 'all';
    if ((current.color || colorDefault) !== (initial.color || colorDefault)) return true;
    if ((current.icon || iconDefault) !== (initial.icon || iconDefault)) return true;
    if ((current.displayFormat || displayDefault) !== (initial.displayFormat || displayDefault)) return true;

    const getLocalDateString = (dateVal) => {
      if (!dateVal) return '';
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return '';
      const tzoffset = d.getTimezoneOffset() * 60000;
      return (new Date(d - tzoffset)).toISOString().split('T')[0];
    };

    // Compare date correctly based on mode
    const d1 = isScreening ? formData.deadline : formData.date;
    const d2 = isScreening 
      ? (task.deadline ? getLocalDateString(task.deadline) : '') 
      : (task.date ? getLocalDateString(task.date) : '');
    if (d1 !== d2) return true;

    // Compare time (ignore duration part if needed)
    let t1 = formData.time || '';
    let t2 = task.time || '';
    if (t2.includes('|')) t2 = t2.split('|')[0];
    if (t1 !== t2) return true;

    // Compare todo list (including memo and done state)
    const normTodo = (list) => {
      if (!Array.isArray(list)) return typeof list === 'string' ? list : '';
      return list.filter(t => {
        const text = typeof t === 'string' ? t : (t.text || '');
        return typeof text === 'string' && text.trim() !== '';
      }).map(t => {
        const text = typeof t === 'string' ? t : (t.text || '');
        const memo = typeof t === 'object' ? (t.memo || '') : '';
        const done = typeof t === 'object' ? !!t.done : false;
        return `${text}||${memo}||${done}`;
      }).join('\n');
    };
    if (normTodo(formData.todoList) !== normTodo(task.todoList)) return true;

    return false;
  };

  const isDirty = checkIsDirty();

  const handleSubmit = async (e, bypassDuplicate = false) => {
    if (e) e.preventDefault();
    console.log("Submitting form...", { hasErrors, isSubmitting, formData });
    
    // Only block if there are non-duplicate errors, or if it's a duplicate and we haven't bypassed it.
    const nonDuplicateErrors = Object.keys(errors).filter(k => k !== 'duplicate').length > 0;
    if (isSubmitting || nonDuplicateErrors || (errors.duplicate && !bypassDuplicate)) {
      return;
    }
    setIsSubmitting(true);
    try {
      let isoDate = null;
      let baseDate = isScreening ? formData.deadline : formData.date;
      if (baseDate) {
        let timeStr = formData.time || '00:00';
        // Strip duration if present (e.g. "14:00|90")
        if (timeStr.includes('|')) {
          timeStr = timeStr.split('|')[0];
        }
        const [year, month, day] = baseDate.split('-').map(Number);
        const [hour, minute] = timeStr.split(':').map(Number);
        // Create date in local time
        const d = new Date(year, month - 1, day, hour, minute);
        isoDate = d.toISOString();
      }

      const cleanedTodoList = Array.isArray(formData.todoList) 
        ? formData.todoList.filter(item => item.text.trim() !== '') 
        : [];

      let finalTime = formData.time;
      if (!isScreening && formData.time && formData.duration) {
        finalTime = `${formData.time}|${formData.duration}`;
      }

      const taskData = {
        ...formData,
        todoList: cleanedTodoList,
        date: isoDate,
        deadline: isoDate, // Also update deadline to match date for consistency
        time: finalTime,
      };
      
      if (task && task.id) {
        if (task.repeatGroupId) {
          console.log("Repeat detected, showing confirm...");
          setPendingUpdate(taskData);
          setShowEditConfirm(true);
          setIsSubmitting(false); // Must reset to allow clicking in confirm
          return; // STOP HERE so confirm can show
        } else {
          await updateTask(task.id, taskData);
          if (formData.applySite) addSiteToHistory(formData.applySite);
          setIsEditing(false);
          onClose();
        }
      } else {
        await addTask(taskData);
        if (formData.applySite) addSiteToHistory(formData.applySite);
        onClose();
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("保存中にエラーが発生しました。入力内容を確認してください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveClick = (e) => {
    if (hasErrors) {
      const errorMsg = Object.values(errors).filter(val => val !== errors.duplicate).join('\n');
      alert(`必須項目を入力してください:\n\n${errorMsg}`);
    } else if (hasDuplicateWarning) {
      const confirmMsg = task && task.id 
        ? `${errors.duplicate}\nこの内容で現在の予定（またはシリーズ全体）を上書き更新しますか？`
        : `${errors.duplicate}\nこのまま新しい予定として保存しますか？（重複を許可する）`;
      if (window.confirm(confirmMsg)) {
        handleSubmit(e, true); // Pass a flag to bypass
      }
    } else {
      handleSubmit(e);
    }
  };

  const confirmEdit = async (mode) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (mode === 'single') {
        await updateTask(task.id, pendingUpdate);
      } else if (mode === 'future') {
        const fromDate = task.date || task.deadline;
        await updateFutureTasks(task.repeatGroupId, fromDate, pendingUpdate);
      }
      setShowEditConfirm(false);
      onClose();
    } catch (error) {
      console.error("Series Edit Error:", error);
      alert("更新中にエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (task.repeatGroupId) {
      setShowDeleteConfirm(true);
    } else {
      if (window.confirm("この予定を削除しますか？\n（削除後は元に戻せません）")) {
        deleteTask(task.id);
        onClose();
      }
    }
  };

  const confirmDelete = (mode) => {
    if (mode === 'single') {
       deleteTask(task.id);
    } else if (mode === 'future') {
       deleteFutureTasks(task.repeatGroupId, task.date);
    }
    setShowDeleteConfirm(false);
    onClose();
  };

  const formatDateString = (dateStr) => {
    if (!dateStr) return '未定';
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
  };

  const renderViewMode = () => {
    const displayDate = isScreening ? formData.deadline : formData.date;

    return (
      <div className="view-mode-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '3rem', width: '80px', height: '80px', background: 'var(--surface)', borderRadius: '1rem', border: `2px solid ${formData.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {Object.keys(ICONS).includes(formData.icon) 
              ? <TaskIcon name={formData.icon} size={48} color={formData.color} />
              : <span style={{fontSize: '3rem'}}>{formData.icon}</span>
            }
          </div>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: formData.color, color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {formData.category}
              </span>
              {colorLabels[formData.color] && (
                <span style={{ fontSize: '0.8rem', color: formData.color, fontWeight: 'bold', border: `1px solid ${formData.color}`, padding: '0.1rem 0.6rem', borderRadius: '1rem' }}>
                  {colorLabels[formData.color]}
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0', color: 'var(--text-main)', lineHeight: '1.2' }}>{formData.title}</h2>
            {formData.companyName && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1rem' }}>
                <Briefcase size={16} />
                <span style={{ fontWeight: 'bold' }}>{formData.companyName}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', padding: '1rem', background: 'var(--surface)', borderRadius: '0.75rem', borderLeft: `4px solid ${formData.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CalIcon size={20} color={formData.color} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isScreening ? '締切日' : '日付'}</div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem', marginTop: '0.1rem' }}>{formatDateString(displayDate)}</div>
            </div>
          </div>
          {formData.time && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={20} color={formData.color} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isScreening ? '締切時間' : '時間'}</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem', marginTop: '0.1rem' }}>
                  {formData.time}
                  {!isScreening && formData.endTime && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                      〜 {formData.endTime} {formData.duration && <span style={{opacity: 0.8}}>({formData.duration}分間)</span>}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {(formData.location || formData.zoomLink) && (
          <div style={{ display: 'grid', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={18} color="var(--text-muted)" style={{ marginTop: '0.2rem' }} />
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>場所 / 住所</div>
                <div style={{ fontWeight: 500, color: formData.location ? 'inherit' : 'var(--text-muted)' }}>
                  {formData.location || '未設定'}
                </div>
              </div>
            </div>
            {formData.zoomLink && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <LinkIcon size={18} color="var(--text-muted)" style={{ marginTop: '0.2rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>オンライン会場 (Zoom等)</div>
                  <a href={formData.zoomLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                    リンクを開く <ExternalLink size={14} />
                  </a>
                  {(formData.zoomId || formData.zoomPassword) && (
                    <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg)', padding: '0.5rem 0.75rem', borderRadius: '0.4rem', border: '1px solid var(--border)', fontSize: '0.9rem' }}>
                      {formData.zoomId && <div><span style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>ID:</span> <code style={{fontWeight: 600}}>{formData.zoomId}</code></div>}
                      {formData.zoomPassword && <div><span style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>PASS:</span> <code style={{fontWeight: 600}}>{formData.zoomPassword}</code></div>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {(formData.dressCode || formData.belongings || formData.applySite) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '0.5rem', background: 'var(--bg)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
            {formData.dressCode && <div><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>服装</div><div style={{ fontWeight: 500 }}>{formData.dressCode}</div></div>}
            {formData.belongings && <div><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>持ち物</div><div style={{ fontWeight: 500 }}>{formData.belongings}</div></div>}
            {formData.applySite && <div style={{ gridColumn: '1 / -1', borderTop: (formData.dressCode || formData.belongings) ? '1px solid var(--border)' : 'none', paddingTop: (formData.dressCode || formData.belongings) ? '0.75rem' : 0 }}><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>申込サイト / 経路</div><div style={{ fontWeight: 500 }}>{formData.applySite}</div></div>}
          </div>
        )}

        {isScreening && formData.todoList && formData.todoList.length > 0 && Array.isArray(formData.todoList) && (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}><CheckSquare size={18} /><span style={{ fontWeight: 600 }}>やることリスト</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {formData.todoList.map((item, index) => {
                if (!item.text?.trim()) return null;
                const isMemoUrl = item.memo && (item.memo.startsWith('http://') || item.memo.startsWith('https://'));
                return (
                  <div key={item.id || index} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.75rem', background: 'var(--surface)', borderRadius: '0.5rem', border: '1px solid var(--border)', opacity: item.done ? 0.65 : 1 }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div
                        onClick={() => {
                          const now = new Date();
                          const ts = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
                          const newTodoList = formData.todoList.map(t =>
                            t.id === item.id
                              ? { ...t, done: !t.done, doneAt: !t.done ? ts : null }
                              : t
                          );
                          setFormData(prev => ({ ...prev, todoList: newTodoList }));
                          // Auto-save immediately to DB
                          if (task?.id) {
                            updateTask(task.id, { todoList: newTodoList });
                          }
                        }}
                        style={{ width: '18px', height: '18px', borderRadius: '4px', border: `2px solid ${item.done ? 'var(--accent-primary)' : 'var(--text-muted)'}`, background: item.done ? 'var(--accent-primary)' : 'transparent', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
                      >
                        {item.done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <span style={{ textDecoration: item.done ? 'line-through' : 'none', fontWeight: 500, flex: 1 }}>{item.text}</span>
                      {item.done && item.doneAt && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>✓ {item.doneAt}</span>
                      )}
                    </div>
                    {item.memo && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.6rem' }}>
                        {isMemoUrl
                          ? <a href={item.memo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><ExternalLink size={11} />{item.memo}</a>
                          : item.memo
                        }
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {formData.links && (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}><LinkIcon size={18} /><span style={{ fontWeight: 600 }}>関連リンク</span></div>
            <a href={formData.links} target="_blank" rel="noopener noreferrer" style={{ padding: '0.75rem', background: 'var(--surface)', borderRadius: '0.5rem', display: 'block', color: 'var(--accent-primary)', wordBreak: 'break-all', border: '1px solid var(--border)', fontWeight: 500 }}>{formData.links}</a>
          </div>
        )}

        {formData.memo && (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}><FileText size={18} /><span style={{ fontWeight: 600 }}>メモ / 備考</span></div>
            <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: '0.5rem', whiteSpace: 'pre-wrap', lineHeight: '1.6', border: '1px solid var(--border)', fontWeight: 500 }}>{formData.memo}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <button type="button" onClick={handleDelete} className="btn-secondary" style={{ marginRight: 'auto', color: 'var(--cat-offer)', borderColor: 'var(--cat-offer)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Trash2 size={20} />削除する</button>
          <button type="button" onClick={() => setIsEditing(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: formData.color || 'var(--accent-primary)' }}><Edit3 size={20} />編集する</button>
        </div>

        {showDeleteConfirm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ background: 'var(--bg)', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: 0 }}>繰り返しの削除</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>この予定は繰り返し設定されています。削除の範囲を選択してください。</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button onClick={() => confirmDelete('single')} className="btn-secondary" style={{ width: '100%', textAlign: 'center', justifyContent: 'center', display: 'flex', padding: '1rem' }}>
                  この予定のみ削除
                </button>
                <button onClick={() => confirmDelete('future')} className="btn-primary" style={{ width: '100%', textAlign: 'center', justifyContent: 'center', display: 'flex', padding: '1rem', background: 'var(--cat-offer)' }}>
                  この予定と今後の予定をすべて削除
                </button>
                <button onClick={() => setShowDeleteConfirm(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginTop: '0.5rem', cursor: 'pointer' }}>
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEditModeFields = () => {
    // These are now derived from categoryGroups at the top of the component
    // isSchedule = schedule group category; isScreening = task group category

    return (
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>タイトル (カレンダー表示名)<span style={{ color: '#ef4444' }}> *</span></label>
          <input 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="例: 1次面接" 
            required 
            style={{ borderColor: errors.title ? '#ef4444' : 'var(--border)' }}
          />
          {errors.title && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.title}</div>}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label>アイコン</label>
          {(() => {
            const iconPool = isScreening ? TASK_ICON_KEYS : SCHEDULE_ICON_KEYS;
            const quickPicks = isScreening
              ? ['CheckSquare', 'FileText', 'Edit3', 'Search', 'Target', 'Clock']
              : ['Building2', 'Presentation', 'Monitor', 'Handshake', 'Calendar', 'Briefcase'];
            return (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {quickPicks.map(iconName => (
                  <div key={iconName} onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))} style={{ cursor: 'pointer', padding: '0.5rem', border: formData.icon === iconName ? '2px solid var(--text-main)' : '2px solid transparent', borderRadius: '0.5rem', background: formData.icon === iconName ? 'var(--surface)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TaskIcon name={iconName} size={24} color="var(--text-main)" />
                  </div>
                ))}
                {!quickPicks.includes(formData.icon) && formData.icon !== '' && (
                  <div style={{ padding: '0.5rem', border: '2px solid var(--text-main)', borderRadius: '0.5rem', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Object.keys(ICONS).includes(formData.icon) ? <TaskIcon name={formData.icon} size={24} color="var(--text-main)" /> : <span style={{fontSize: '1.25rem'}}>{formData.icon}</span>}
                  </div>
                )}
                <button type="button" onClick={() => setShowIconPicker(!showIconPicker)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', marginLeft: '0.5rem' }} title="アイコンをさらに選ぶ"><Plus size={20} /></button>

                {showIconPicker && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, marginTop: '0.5rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '1rem', width: '300px', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{isScreening ? 'タスク用' : 'スケジュール用'}アイコンを選択</span>
                      <button type="button" onClick={() => setShowIconPicker(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={16}/></button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                      {iconPool.map(name => (
                        <div
                          key={name}
                          onClick={() => { setFormData(prev => ({ ...prev, icon: name })); setShowIconPicker(false); }}
                          title={ICONS[name].label}
                          style={{ padding: '0.5rem', borderRadius: '0.25rem', cursor: 'pointer', background: formData.icon === name ? 'var(--surface)' : 'transparent', border: formData.icon === name ? '1px solid var(--border)' : '1px solid transparent' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = formData.icon === name ? 'var(--surface)' : 'transparent'}
                        >
                          <TaskIcon name={name} size={24} color="var(--text-main)" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>カレンダー表示形式</label>
          <select name="displayFormat" value={formData.displayFormat} onChange={handleChange}>
            <option value="all">全て表示</option>
            <option value="icon_time">アイコンと時間のみ</option>
            <option value="name_time">名前と時間のみ</option>
            <option value="icon_name">アイコンと名前のみ</option>
            <option value="icon_only">アイコンのみ</option>
            <option value="name_only">名前のみ</option>
          </select>
        </div>

        {!(task && task.id) && !isScreening && (
          <div className="form-group" style={{ gridColumn: '1 / -1', background: 'var(--surface)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Clock size={16} /> 予定の繰り返し設定
            </label>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', alignItems: 'end' }}>
              <select name="repeat" value={formData.repeat} onChange={handleChange} style={{ width: '100%' }}>
                <option value="none">繰り返さない</option>
                <option value="daily">毎日</option>
                <option value="weekdays">平日のみ (月〜金)</option>
                <option value="weekly">毎週</option>
                <option value="monthly">毎月</option>
              </select>
              
              {formData.repeat !== 'none' && (
                <select name="repeatEndMode" value={formData.repeatEndMode} onChange={handleChange}>
                  <option value="count">作成件数で指定 (回数)</option>
                  <option value="date">終了日で指定 (日付)</option>
                </select>
              )}
            </div>

            {formData.repeat !== 'none' && (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1rem', padding: '0.75rem', background: 'var(--bg)', borderRadius: '0.5rem' }}>
                {formData.repeatEndMode === 'count' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>件数:</span>
                    <input type="number" name="repeatCount" value={formData.repeatCount} onChange={handleChange} min="2" max="100" style={{ width: '80px' }} />
                    <span>件 (最大100件)</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>終了日:</span>
                    <input type="date" name="repeatEndDate" value={formData.repeatEndDate} onChange={handleChange} required style={{ borderColor: errors.repeatEndDate ? '#ef4444' : 'var(--border)' }} />
                  </div>
                )}
                {errors.repeatEndDate && <div style={{ color: '#ef4444', fontSize: '0.75rem', width: '100%', marginTop: '0.25rem' }}>{errors.repeatEndDate}</div>}

                {formData.repeat === 'monthly' && (
                  <div style={{ paddingLeft: '1rem', borderLeft: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 'normal', margin: 0 }}>
                      <input type="radio" value="date" checked={formData.monthlyMode === 'date'} onChange={() => setFormData(p => ({...p, monthlyMode: 'date'}))} /> 同じ日付
                    </label>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 'normal', margin: 0 }}>
                      <input type="radio" value="weekday" checked={formData.monthlyMode === 'weekday'} onChange={() => setFormData(p => ({...p, monthlyMode: 'weekday'}))} /> 同じ曜日
                    </label>
                  </div>
                )}
              </div>
            )}
            
            {formData.repeat !== 'none' && (
               <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                 ※新規作成時のみ。保存すると設定通り複数の予定が一括作成されます。
               </p>
            )}
          </div>
        )}

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>会社名<span style={{ color: '#ef4444' }}> *</span></label>
          <input 
            name="companyName" 
            value={formData.companyName} 
            onChange={handleChange} 
            placeholder="会社名" 
            required 
            style={{ borderColor: errors.companyName ? '#ef4444' : 'var(--border)' }}
          />
          {errors.companyName && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.companyName}</div>}
        </div>

        <div className="form-group">
          <label>カテゴリ</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {scheduleCategories.length > 0 && (
              <optgroup label="📅 スケジュール（日程・場所ありの予定）">
                {scheduleCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </optgroup>
            )}
            {taskCategories.length > 0 && (
              <optgroup label="✅ タスク（締切・チェックリストありの作業）">
                {taskCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </optgroup>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>{isScreening ? '締切日 / 予定日' : '日付'}<span style={{ color: '#ef4444' }}> *</span></label>
          <input 
            type="date" 
            name={isScreening ? "deadline" : "date"} 
            value={isScreening ? formData.deadline : formData.date} 
            onChange={handleChange} 
            required 
            style={{ borderColor: errors.date ? '#ef4444' : 'var(--border)' }}
          />
          {errors.date && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.date}</div>}
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label>{isScreening ? '締切時間' : '開始時間'}</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          
            {!isScreening && (
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label>終了時間</label>
                <input type="time" name="endTime" value={formData.endTime || ''} onChange={handleChange} style={{ width: '100%', borderColor: errors.endTime ? '#ef4444' : 'var(--border)' }} />
                {errors.endTime && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.endTime}</div>}
              </div>
            )}
        </div>

        {!isScreening && (
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
              <input 
                type="checkbox" 
                checked={showDurationOption} 
                onChange={(e) => setShowDurationOption(e.target.checked)} 
                style={{ width: 'auto', margin: 0 }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>オプション: 所要時間（分数）で終了時刻を計算する</span>
            </label>
            
            {showDurationOption && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="例: 90" style={{ width: '100px' }} />
                <span style={{ fontWeight: 500 }}>分間</span>
              </div>
            )}
          </div>
        )}

        {isSchedule && (
          <>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>場所 (住所)</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                 <button type="button" onClick={() => setFormData(p => ({...p, location: 'オンライン'}))} className="btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}>オンライン</button>
                 {homeAddress && <button type="button" onClick={() => setFormData(p => ({...p, location: homeAddress}))} className="btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}>自宅住所を入力</button>}
              </div>
              <input name="location" value={formData.location} onChange={handleChange} placeholder="例: 東京都... または オンライン" />
            </div>
            
            {(isSchedule && formData.location === 'オンライン') && (
              <>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>会議リンク (Zoom/Teams等)</label><input type="url" name="zoomLink" value={formData.zoomLink} onChange={handleChange} placeholder="https://..." /></div>
                <div className="form-group" style={{ gridColumn: '1 / 1' }}><label>会議 ID</label><input name="zoomId" value={formData.zoomId} onChange={handleChange} placeholder="例: 123 456 7890" /></div>
                <div className="form-group" style={{ gridColumn: '2 / 2' }}><label>パスワード</label><input name="zoomPassword" value={formData.zoomPassword} onChange={handleChange} placeholder="パスワード" /></div>
              </>
            )}
            <div className="form-group"><label>服装</label><input name="dressCode" value={formData.dressCode} onChange={handleChange} placeholder="例: オフィスカジュアル" /></div>
            <div className="form-group"><label>持ち物</label><input name="belongings" value={formData.belongings} onChange={handleChange} placeholder="例: 履歴書、筆記用具" /></div>
            {isSchedule && (
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>申し込んだサイト</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input name="applySite" value={formData.applySite} onChange={handleChange} placeholder="例: リクナビ、マイナビ" />
                  {siteHistory && siteHistory.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {siteHistory.map(site => (
                        <div key={site} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem', fontSize: '0.85rem' }}>
                          <span style={{ cursor: 'pointer' }} onClick={() => setFormData(prev => ({ ...prev, applySite: site }))}>{site}</span>
                          <button type="button" onClick={() => removeSiteFromHistory(site)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', padding: 0, display: 'flex', cursor: 'pointer' }} title="履歴から削除"><X size={14} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <CheckSquare size={16} /> やること (チェックリスト)
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Array.isArray(formData.todoList) && formData.todoList.map((item) => (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', background: 'var(--surface)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div 
                    onClick={() => { setFormData(prev => ({ ...prev, todoList: prev.todoList.map(t => t.id === item.id ? { ...t, done: !t.done } : t) })); }} 
                    style={{ width: '1.25rem', height: '1.25rem', borderRadius: '4px', border: `2px solid ${item.done ? 'var(--accent-primary)' : 'var(--border)'}`, flexShrink: 0, background: item.done ? 'var(--accent-primary)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                  >
                    {item.done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <input 
                    type="text" 
                    value={item.text} 
                    onChange={(e) => { const newText = e.target.value; setFormData(prev => ({ ...prev, todoList: prev.todoList.map(t => t.id === item.id ? { ...t, text: newText } : t) })); }} 
                    onKeyDown={(e) => { 
                      if (e.key === 'Enter') { 
                        e.preventDefault(); 
                        setFormData(prev => {
                          const list = [...prev.todoList];
                          list.push({ id: Date.now() + Math.random(), text: '', done: false, memo: '' });
                          return { ...prev, todoList: list };
                        });
                      } 
                    }} 
                    placeholder="やることを入力..." 
                    style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none', opacity: item.done ? 0.6 : 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', padding: '0.1rem 0' }} 
                  />
                  <button type="button" onClick={() => { setFormData(prev => { let list = prev.todoList.filter(t => t.id !== item.id); if (list.length === 0) list = [{ id: Date.now(), text: '', done: false, memo: '' }]; return { ...prev, todoList: list }; }); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}><X size={16} /></button>
                </div>
                <input
                  type="text"
                  value={item.memo || ''}
                  onChange={(e) => { const newMemo = e.target.value; setFormData(prev => ({ ...prev, todoList: prev.todoList.map(t => t.id === item.id ? { ...t, memo: newMemo } : t) })); }}
                  placeholder="メモ・リンクを追加（任意）..."
                  style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'transparent', border: 'none', borderTop: '1px solid var(--border)', paddingTop: '0.3rem', outline: 'none', width: '100%' }}
                />
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  todoList: [...(Array.isArray(prev.todoList) ? prev.todoList : []), { id: Date.now(), text: '', done: false, memo: '' }]
                }));
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px dashed var(--border)', padding: '0.75rem', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <Plus size={16} /> 項目を追加
            </button>
          </div>
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>関連リンク</label><input type="url" name="links" value={formData.links} onChange={handleChange} placeholder="https://..." /></div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
            <label style={{ margin: 0 }}>カラータグ (カレンダーのアイコン色)</label>
            <span style={{ fontSize: '0.9rem', color: formData.color || 'var(--text-main)', fontWeight: 'bold' }}>選択中: {colorLabels[formData.color] || 'カスタムラベルなし'}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {(isScreening ? ['#fef08a', '#fde047', '#facc15', '#eab308', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#fca5a5', '#f87171', '#ef4444', '#dc2626'] : ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#6ee7b7', '#34d399', '#10b981', '#059669', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7']).map(c => (
              <div key={c} title={colorLabels[c] || c} onClick={() => setFormData(prev => ({ ...prev, color: c }))} style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: c, cursor: 'pointer', border: formData.color === c ? '3px solid var(--text-main)' : '2px solid transparent', boxShadow: formData.color === c ? 'var(--shadow-md)' : 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{colorLabels[c] && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)' }} />}</div>
            ))}
          </div>
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>メモ</label><textarea name="memo" value={formData.memo} onChange={handleChange} rows={4} placeholder="メモ..." /></div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', gridColumn: '1 / -1', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <button 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowEditConfirm(false); 
              if (task) {
                resetForm(); // Reset changes
                setIsEditing(false); // Return to view mode
              } else {
                onClose();
              }
            }} 
            className="btn-secondary"
          >
            キャンセル
          </button>
          <button 
            type="button" 
            onClick={handleSaveClick}
            className="btn-primary" 
            disabled={isSubmitting || (task && !isDirty)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: (hasErrors || (task && !isDirty)) ? '#94a3b8' : (formData.color || 'var(--accent-primary)'),
              cursor: (hasErrors || isSubmitting || (task && !isDirty)) ? 'not-allowed' : 'pointer',
              opacity: (hasErrors || isSubmitting || (task && !isDirty)) ? 0.7 : 1,
              transition: 'all 0.2s',
              transform: (task && !isDirty) ? 'none' : undefined,
              boxShadow: (hasErrors || (task && !isDirty)) ? 'none' : undefined
            }}
          >
            <Save size={20} />
            {isSubmitting ? '保存中...' : (
              (task && !isDirty) ? '変更なし' : 
              (hasErrors ? '未入力項目あり' : 
              (hasDuplicateWarning ? '重複ありで保存' : '保存する'))
            )}
          </button>
        </div>
        {errors.duplicate && (
          <div style={{ gridColumn: '1 / -1', color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'right', fontWeight: 'bold' }}>
            {errors.duplicate}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isEditing ? '1.5rem' : '0' }}>
          {isEditing && (
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: formData.color || 'var(--accent-primary)' }}>
              {task && task.id ? 'スケジュールの編集' : '新しいスケジュール'}
            </h2>
          )}
          <button type="button" onClick={onClose} style={{ marginLeft: 'auto', background: 'var(--bg)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            {renderEditModeFields()}
          </form>
        ) : renderViewMode()}

      </div>

      {showEditConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'var(--surface-solid)', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: 0 }}>変更の適用範囲</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>この予定は繰り返し設定されています。変更をどこまで適用しますか？</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={() => confirmEdit('single')} className="btn-primary" style={{ background: 'var(--surface)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
                この予定のみ変更
              </button>
              <button onClick={() => confirmEdit('future')} className="btn-primary" style={{ background: formData.color || 'var(--accent-primary)' }}>
                この予定と今後の予定をすべて変更
              </button>
              <button onClick={() => setShowEditConfirm(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginTop: '0.5rem', cursor: 'pointer' }}>
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
