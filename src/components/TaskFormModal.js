"use client";

import { useState, useEffect } from 'react';
import { useTasks } from '@/context/TaskContext';
import { X, Save, Trash2, Plus, Edit3, Calendar as CalIcon, MapPin, Clock, Briefcase, Link as LinkIcon, CheckSquare, FileText, ExternalLink } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

export default function TaskFormModal({ isOpen, onClose, task }) {
  const { addTask, updateTask, deleteTask, siteHistory, addSiteToHistory, removeSiteFromHistory, colorLabels } = useTasks();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(!task);

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
    duration: '', // Used for duration in minutes
    location: '',
    zoomLink: '',
    applySite: '',
    dressCode: '',
    belongings: '',
    deadline: '',
    todoList: getInitialTodoList(),
    links: '',
    memo: '',
    color: '#0ea5e9',
    icon: '🏢',
    displayFormat: 'all',
  });

  const isScreening = formData.category === '審査' || formData.category === '採用審査';

  // Calculate End Time from Start Time + Duration
  const getEndTime = (start, dur) => {
    if (!start || !dur) return '';
    const [h, m] = start.split(':').map(Number);
    const total = h * 60 + m + Number(dur);
    return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  };

  const calculatedEndTime = (!isScreening && formData.time && formData.duration) 
    ? getEndTime(formData.time, formData.duration) : '';

  // Extract task data on mount
  useEffect(() => {
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

      setFormData(prev => ({
        ...prev,
        ...task,
        date: parsedData.date || '',
        time: defaultTime,
        duration: defaultDur,
      }));
    }
  }, [task]);

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
      if (name === 'category') newData.color = getCategoryColor(value);
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isoDate = null;
    let baseDate = formData.date || formData.deadline;
    if (baseDate) {
      const timeStr = formData.time || '00:00';
      const d = new Date(`${baseDate}T${timeStr}`);
      isoDate = d.toISOString();
    }

    const cleanedTodoList = Array.isArray(formData.todoList) 
      ? formData.todoList.filter(item => item.text.trim() !== '') 
      : [];

    // Pack time and duration into the single "time" string so Prisma doesn't need migration
    let finalTime = formData.time;
    if (!isScreening && formData.time && formData.duration) {
      finalTime = `${formData.time}|${formData.duration}`;
    }

    const taskData = {
      ...formData,
      todoList: cleanedTodoList,
      date: isoDate,
      time: finalTime,
    };
    
    // Explicitly prevent duration from being sent directly to Prisma DB
    delete taskData.duration;

    if (task) updateTask(task.id, taskData);
    else addTask(taskData);
    
    if (formData.applySite) addSiteToHistory(formData.applySite);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("この予定を削除しますか？\n（削除後は元に戻せません）")) {
      deleteTask(task.id);
      onClose();
    }
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
            {formData.icon}
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

        <div style={{ display: 'flex', gap: '2rem', padding: '1rem', background: 'var(--surface)', borderRadius: '0.75rem', borderLeft: `4px solid ${formData.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CalIcon size={20} color={formData.color} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isScreening ? '締切日' : '日付'}</div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem', marginTop: '0.1rem' }}>{formatDateString(displayDate)}</div>
            </div>
          </div>
          {formData.time && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid var(--border)', paddingLeft: '2rem' }}>
              <Clock size={20} color={formData.color} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isScreening ? '締切時間' : '時間'}</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem', marginTop: '0.1rem' }}>
                  {formData.time}
                  {calculatedEndTime && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                      〜 {calculatedEndTime} <span style={{opacity: 0.8}}>({formData.duration}分間)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {(formData.location || formData.zoomLink) && (
          <div style={{ display: 'grid', gap: '1rem', marginTop: '0.5rem' }}>
            {formData.location && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--text-muted)" style={{ marginTop: '0.2rem' }} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>場所 / 住所</div>
                  <div style={{ fontWeight: 500 }}>{formData.location}</div>
                </div>
              </div>
            )}
            {formData.zoomLink && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <LinkIcon size={18} color="var(--text-muted)" style={{ marginTop: '0.2rem' }} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>Zoom・オンライン会場リンク</div>
                  <a href={formData.zoomLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}>
                    リンクを開く <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {(formData.dressCode || formData.belongings || formData.applySite) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem', background: 'var(--bg)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
            {formData.dressCode && <div><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>服装</div><div style={{ fontWeight: 500 }}>{formData.dressCode}</div></div>}
            {formData.belongings && <div><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>持ち物</div><div style={{ fontWeight: 500 }}>{formData.belongings}</div></div>}
            {formData.applySite && <div style={{ gridColumn: '1 / -1', borderTop: (formData.dressCode || formData.belongings) ? '1px solid var(--border)' : 'none', paddingTop: (formData.dressCode || formData.belongings) ? '0.75rem' : 0 }}><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>申込サイト / 経路</div><div style={{ fontWeight: 500 }}>{formData.applySite}</div></div>}
          </div>
        )}

        {isScreening && formData.todoList && formData.todoList.length > 0 && Array.isArray(formData.todoList) && (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}><CheckSquare size={18} /><span style={{ fontWeight: 600 }}>やることリスト</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {formData.todoList.map((item, index) => (
                <div key={item.id || index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem', background: 'var(--surface)', borderRadius: '0.5rem', opacity: item.done ? 0.6 : 1, border: '1px solid var(--border)' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--text-muted)', background: item.done ? 'var(--text-muted)' : 'transparent', flexShrink: 0 }} />
                  <span style={{ textDecoration: item.done ? 'line-through' : 'none', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
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
      </div>
    );
  };

  const renderEditModeFields = () => {
    const isInfoSession = formData.category === '説明会';
    const isIntern = formData.category === 'インターンシップ';

    return (
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>タイトル (カレンダー表示名)</label>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="例: 1次面接" required />
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label>アイコン</label>
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {['🏭', '🏢', '💻', '🤝', '📝', '🎯'].map(emoji => (
              <div key={emoji} onClick={() => setFormData(prev => ({ ...prev, icon: emoji }))} style={{ fontSize: '1.25rem', cursor: 'pointer', padding: '0.25rem', border: formData.icon === emoji ? '2px solid var(--text-main)' : '2px solid transparent', borderRadius: '0.25rem', background: formData.icon === emoji ? 'var(--surface)' : 'transparent' }}>{emoji}</div>
            ))}
            {!['🏭', '🏢', '💻', '🤝', '📝', '🎯'].includes(formData.icon) && formData.icon !== '' && (<div style={{ fontSize: '1.25rem', padding: '0.25rem', border: '2px solid var(--text-main)', borderRadius: '0.25rem', background: 'var(--surface)' }}>{formData.icon}</div>)}
            <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', marginLeft: '0.5rem' }} title="アイコンをさらに選ぶ"><Plus size={16} /></button>
            {showEmojiPicker && (
              <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, marginTop: '0.5rem', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', background: '#fff', padding: '0.5rem', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem', border: '1px solid var(--border)', borderBottom: 'none' }}><button type="button" onClick={() => setShowEmojiPicker(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={16}/></button></div>
                <EmojiPicker onEmojiClick={(e) => { setFormData(prev => ({ ...prev, icon: e.emoji })); setShowEmojiPicker(false); }} />
              </div>
            )}
          </div>
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>カレンダー表示形式</label>
          <select name="displayFormat" value={formData.displayFormat} onChange={handleChange}>
            <option value="all">全て表示 (アイコン＋時間＋名前)</option>
            <option value="icon_time">アイコンと時間のみ</option>
            <option value="name_time">名前と時間のみ</option>
            <option value="icon_only">アイコンのみ</option>
            <option value="name_only">名前のみ</option>
          </select>
        </div>

        <div className="form-group">
          <label>会社名</label>
          <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="会社名" required />
        </div>

        <div className="form-group">
          <label>カテゴリ</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="説明会">説明会</option>
            <option value="審査">審査</option>
            <option value="インターンシップ">インターンシップ</option>
            <option value="採用審査">採用審査</option>
            <option value="内定">内定</option>
          </select>
        </div>

        <div className="form-group">
          <label>{isScreening ? '締切日 / 予定日' : '日付'}</label>
          <input type="date" name={isScreening ? "deadline" : "date"} value={isScreening ? formData.deadline : formData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>{isScreening ? '締切時間' : '開始時間'}</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} />
        </div>

        {!isScreening && (
          <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div>
              <label>所要時間 (分間)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="例: 90" style={{ width: '100px' }} />
                <span style={{ fontWeight: 500 }}>分間</span>
              </div>
            </div>
            {calculatedEndTime && (
              <div style={{ paddingBottom: '0.6rem', fontWeight: 600, color: 'var(--accent-primary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} /> 自動計算 終了時間: <span style={{ fontSize: '1.1rem' }}>{calculatedEndTime}</span>
              </div>
            )}
          </div>
        )}

        {(isInfoSession || isIntern) && (
          <>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>場所 (住所)</label><input name="location" value={formData.location} onChange={handleChange} placeholder="例: 東京都..." /></div>
            {isInfoSession && <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>Zoom リンク</label><input type="url" name="zoomLink" value={formData.zoomLink} onChange={handleChange} placeholder="https://..." /></div>}
            <div className="form-group"><label>服装</label><input name="dressCode" value={formData.dressCode} onChange={handleChange} placeholder="例: オフィスカジュアル" /></div>
            <div className="form-group"><label>持ち物</label><input name="belongings" value={formData.belongings} onChange={handleChange} placeholder="例: 履歴書、筆記用具" /></div>
            {isInfoSession && (
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

        {isScreening && (
          <>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>やること (チェックリスト)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Array.isArray(formData.todoList) && formData.todoList.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div onClick={() => { setFormData(prev => ({ ...prev, todoList: prev.todoList.map(t => t.id === item.id ? { ...t, done: !t.done } : t) })); }} style={{ width: '1.25rem', height: '1.25rem', borderRadius: '4px', border: '2px solid var(--border)', flexShrink: 0, background: item.done ? 'var(--accent-primary)' : 'transparent', cursor: 'pointer' }} />
                    <input type="text" value={item.text} onChange={(e) => { const newText = e.target.value; setFormData(prev => ({ ...prev, todoList: prev.todoList.map(t => t.id === item.id ? { ...t, text: newText } : t) })); }} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setFormData(prev => { let list = [...prev.todoList]; if (list[list.length - 1].text.trim() !== '') { list.push({ id: Date.now() + Math.random(), text: '', done: false }); } return { ...prev, todoList: list }; }); } }} onBlur={() => { setFormData(prev => { let list = prev.todoList.filter((t, idx) => t.text.trim() !== '' || idx === prev.todoList.length - 1); if (list.length === 0 || list[list.length - 1].text.trim() !== '') { list.push({ id: Date.now() + Math.random(), text: '', done: false }); } return { ...prev, todoList: list }; }); }} placeholder="やることを入力..." style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none', opacity: item.done ? 0.6 : 1 }} />
                    <button type="button" onClick={() => { setFormData(prev => { let list = prev.todoList.filter(t => t.id !== item.id); if (list.length === 0) list = [{ id: Date.now(), text: '', done: false }]; return { ...prev, todoList: list }; }); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}><X size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}><label>関連リンク</label><input type="url" name="links" value={formData.links} onChange={handleChange} placeholder="https://..." /></div>
          </>
        )}

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
          <button type="button" onClick={() => task ? setIsEditing(false) : onClose()} className="btn-secondary">キャンセル</button>
          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: formData.color || 'var(--accent-primary)' }}><Save size={20} />保存する</button>
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '600px', width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isEditing ? '1.5rem' : '0' }}>
          {isEditing && (
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: formData.color || 'var(--accent-primary)' }}>
              {task ? 'スケジュールの編集' : '新しいスケジュール'}
            </h2>
          )}
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'var(--bg)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        {isEditing ? <form onSubmit={handleSubmit}>{renderEditModeFields()}</form> : renderViewMode()}
      </div>
    </div>
  );
}
