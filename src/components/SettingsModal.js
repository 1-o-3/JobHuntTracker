"use client";

import { useTasks } from '@/context/TaskContext';
import { X, Save, ChevronLeft, Plus, Trash2, Settings, Tags, Palette, Image as ImageIcon, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import TaskIcon, { ICONS, SCHEDULE_ICON_KEYS, TASK_ICON_KEYS } from './TaskIcon';

export default function SettingsModal({ isOpen, onClose }) {
  const { colorLabels, updateAllColorLabels, categoryGroups, updateCategories, renameCategoryInTasks, getCategoriesInUse, iconColors, updateAllIconColors, homeAddress, updateHomeAddress } = useTasks();
  
  const [activeMenu, setActiveMenu] = useState(null);
  const [localLabels, setLocalLabels] = useState({});
  const [localCategories, setLocalCategories] = useState({ schedule: [], task: [] });
  const [originalCategories, setOriginalCategories] = useState({ schedule: [], task: [] });
  const [localIconColors, setLocalIconColors] = useState({});
  const [localHomeAddress, setLocalHomeAddress] = useState('');
  
  // Track bulk color pickers' display values
  const [bulkColors, setBulkColors] = useState({ all: '#000000', schedule: '#000000', task: '#000000' });
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLocalLabels(colorLabels || {});
      const grp = categoryGroups || { schedule: [], task: [] };
      setLocalCategories({ schedule: [...(grp.schedule || [])], task: [...(grp.task || [])] });
      setOriginalCategories({ schedule: [...(grp.schedule || [])], task: [...(grp.task || [])] });
      setLocalIconColors(iconColors || {});
      setLocalHomeAddress(homeAddress || '');
      if (!activeMenu) setActiveMenu(null);
    } else {
      setActiveMenu(null);
    }
  }, [isOpen, colorLabels, categoryGroups]);

  if (!isOpen) return null;

  const handleSaveColors = () => {
    updateAllColorLabels(localLabels);
    setActiveMenu(null);
  };

  const handleSaveCategories = async () => {
    const schedule = (localCategories.schedule || []).filter(c => c.trim() !== '');
    const task = (localCategories.task || []).filter(c => c.trim() !== '');
    if (schedule.length + task.length === 0) {
      alert('少なくとも1つのカテゴリが必要です');
      return;
    }

    // Detect renames and apply to existing tasks
    const allOld = [...(originalCategories.schedule || []), ...(originalCategories.task || [])];
    const allNew = [...schedule, ...task];
    for (let i = 0; i < allOld.length; i++) {
      const oldName = allOld[i];
      const newName = allNew[i];
      if (oldName && newName && oldName !== newName) {
        await renameCategoryInTasks(oldName, newName);
      }
    }

    updateCategories({ schedule, task });
    setActiveMenu(null);
  };

  const handleSaveIconColors = () => {
    updateAllIconColors(localIconColors);
    setActiveMenu(null);
  };

  const handleSaveHomeAddress = () => {
    updateHomeAddress(localHomeAddress);
    setActiveMenu(null);
  };

  const handleBulkColorChange = (color, filter = 'all') => {
    // Update display values of pickers
    setBulkColors(prev => {
      if (filter === 'all') {
        return { all: color, schedule: color, task: color };
      }
      return { ...prev, [filter]: color };
    });

    const updatedColors = { ...localIconColors };
    Object.keys(ICONS).forEach(key => {
      const g = ICONS[key].group;
      if (filter === 'all') {
        updatedColors[key] = color;
      } else if (filter === 'schedule' && g === 'schedule') {
        updatedColors[key] = color;
      } else if (filter === 'task' && g === 'task') {
        updatedColors[key] = color;
      }
    });
    setLocalIconColors(updatedColors);
  };

  const addCategory = () => {
    if (newCategory.trim() !== '' && !localCategories.includes(newCategory.trim())) {
      setLocalCategories([...localCategories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const updateLocalCategory = (index, value) => {
    const next = [...localCategories];
    next[index] = value;
    setLocalCategories(next);
  };

  const removeCategory = (index) => {
    const next = localCategories.filter((_, i) => i !== index);
    setLocalCategories(next);
  };

  const handleClose = () => {
    setActiveMenu(null);
    onClose();
  };

  const screeningColors = ['#fef08a', '#fde047', '#facc15', '#eab308', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#fca5a5', '#f87171', '#ef4444', '#dc2626'];
  const infoColors = ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#6ee7b7', '#34d399', '#10b981', '#059669', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7'];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '800px', width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {activeMenu ? (
              <button 
                onClick={() => setActiveMenu(null)} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 0.5rem 0 0', flexShrink: 0 }}
              >
                <ChevronLeft size={24} />
              </button>
            ) : (
              <div className="icon-3d gray" style={{ padding: '0.4rem', borderRadius: '0.5rem' }}><Settings size={22} /></div>
            )}
            {activeMenu === 'colors' ? 'カラータグ編集' : activeMenu === 'categories' ? 'カテゴリ編集' : activeMenu === 'iconColors' ? 'アイコンカラー編集' : activeMenu === 'homeAddress' ? '自宅住所の設定' : '設定'}
          </h2>
          <button onClick={handleClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)' }}><X size={24} /></button>
        </div>

        {!activeMenu && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>編集する設定項目を選んでください。</p>
            <button
              onClick={() => setActiveMenu('categories')}
              style={{ padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0.75rem', textAlign: 'left', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              <div className="icon-3d blue"><Tags size={20} /></div> カテゴリの編集
            </button>
            <button
              onClick={() => setActiveMenu('colors')}
              style={{ padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0.75rem', textAlign: 'left', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              <div className="icon-3d pink"><Palette size={20} /></div> カラータグ (ラベル)の編集
            </button>
            <button
              onClick={() => setActiveMenu('iconColors')}
              style={{ padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0.75rem', textAlign: 'left', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              <div className="icon-3d purple"><ImageIcon size={20} /></div> アイコン表示のカラー編集
            </button>
            <button
              onClick={() => setActiveMenu('homeAddress')}
              style={{ padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0.75rem', textAlign: 'left', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              <div className="icon-3d gray" style={{background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', color: '#166534'}}><Home size={20} /></div> 自宅住所の設定
            </button>
          </div>
        )}

        {activeMenu === 'homeAddress' && (
          <div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              自宅の住所を設定しておくと、タスク作成時に「場所」をワンタップで入力できます。Googleマップでの検索にも利用されます。
            </p>
            <div className="form-group">
              <label>自宅住所</label>
              <input 
                type="text" 
                value={localHomeAddress} 
                onChange={e => setLocalHomeAddress(e.target.value)} 
                placeholder="例: 東京都千代田区1-1-1" 
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem' }}>
              <button type="button" onClick={() => setActiveMenu(null)} className="btn-secondary">キャンセル</button>
              <button type="button" onClick={handleSaveHomeAddress} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Save size={20} /> 保存
              </button>
            </div>
          </div>
        )}

        {activeMenu === 'categories' && (() => {
          const groups = { schedule: localCategories.schedule || [], task: localCategories.task || [] };
          const renderGroup = (groupKey, label, badgeColor) => (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ background: badgeColor, color: '#fff', fontWeight: 700, fontSize: '0.8rem', padding: '0.2rem 0.75rem', borderRadius: '1rem' }}>{label}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {groupKey === 'schedule' ? '日付・時刻・場所などのフォームが表示されます' : '締切・チェックリストなどのフォームが表示されます'}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {(localCategories[groupKey] || []).map((cat, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={cat}
                      onChange={(e) => {
                        const next = { ...localCategories, [groupKey]: [...(localCategories[groupKey] || [])] };
                        next[groupKey][index] = e.target.value;
                        setLocalCategories(next);
                      }}
                      style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
                      placeholder="カテゴリ名"
                    />
                    <button
                      onClick={() => {
                        const inUse = getCategoriesInUse();
                        if (inUse.has(cat)) {
                          alert(`「${cat}」はすでに予定に使われているため削除できません。\nこのカテゴリを使っている予定を先に別のカテゴリに変更してください。`);
                          return;
                        }
                        const next = { ...localCategories, [groupKey]: (localCategories[groupKey] || []).filter((_, i) => i !== index) };
                        setLocalCategories(next);
                      }}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}
                      title={getCategoriesInUse().has(cat) ? '使用中のため削除不可' : '削除'}
                    >
                      <Trash2 size={18} color={getCategoriesInUse().has(cat) ? '#cbd5e1' : undefined} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setLocalCategories(prev => ({ ...prev, [groupKey]: [...(prev[groupKey] || []), ''] }));
                }}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
              >
                <Plus size={16} /> {label}カテゴリを追加
              </button>
            </div>
          );

          return (
            <div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                カテゴリを「スケジュール」と「タスク」の2種類に分けて管理します。どちらのグループに属するかで、予定作成フォームの表示内容が変わります。
              </p>
              {renderGroup('schedule', 'スケジュール', '#3b82f6')}
              {renderGroup('task', 'タスク', '#f59e0b')}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <button type="button" onClick={() => setActiveMenu(null)} className="btn-secondary">キャンセル</button>
                <button type="button" onClick={handleSaveCategories} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Save size={20} /> 保存
                </button>
              </div>
            </div>
          );
        })()}

        {activeMenu === 'iconColors' && (() => {
          const scheduleOnlyKeys = Object.keys(ICONS).filter(k => ICONS[k].group === 'schedule');
          const taskOnlyKeys     = Object.keys(ICONS).filter(k => ICONS[k].group === 'task');
          const bothKeys         = Object.keys(ICONS).filter(k => ICONS[k].group === 'both');

          const IconRow = ({ iconName }) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', padding: '0.6rem 0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <TaskIcon name={iconName} size={18} color={localIconColors[iconName] || 'var(--text-main)'} />
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{ICONS[iconName].label.split('/')[0].trim()}</span>
              </div>
              <input type="color" value={localIconColors[iconName] || '#1f2937'}
                onChange={e => setLocalIconColors(prev => ({ ...prev, [iconName]: e.target.value }))}
                style={{ width: '26px', height: '26px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
            </div>
          );

          return (
            <div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                各アイコンのデフォルト色を変更できます。カレンダーとタスク一覧に即時反映されます。
              </p>

              {/* 一括変更パネル */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem', padding: '1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0.75rem' }}>
                <span style={{ fontWeight: 700, marginBottom: '0.25rem' }}>一括変更</span>
                {[
                  { label: 'すべて一括', filter: 'all' },
                  { label: 'スケジュール用のみ', filter: 'schedule' },
                  { label: 'タスク用のみ', filter: 'task' },
                ].map(({ label, filter }) => (
                  <div key={filter} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, minWidth: '150px' }}>{label}</span>
                    <input 
                      type="color" 
                      value={bulkColors[filter]} 
                      onChange={e => handleBulkColorChange(e.target.value, filter)}
                      style={{ width: '30px', height: '30px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
                    />
                  </div>
                ))}
              </div>

              {/* スケジュール用 */}
              <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#3b82f6', color: '#fff', padding: '0.15rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>スケジュール</span>専用アイコン
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {scheduleOnlyKeys.map(n => <IconRow key={n} iconName={n} />)}
              </div>

              {/* タスク用 */}
              <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#f59e0b', color: '#fff', padding: '0.15rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>タスク</span>専用アイコン
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {taskOnlyKeys.map(n => <IconRow key={n} iconName={n} />)}
              </div>

              {/* 共通 */}
              <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.9rem' }}>共通アイコン</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {bothKeys.map(n => <IconRow key={n} iconName={n} />)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <button type="button" onClick={() => setActiveMenu(null)} className="btn-secondary">キャンセル</button>
                <button type="button" onClick={handleSaveIconColors} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Save size={20} /> 保存
                </button>
              </div>
            </div>
          );
        })()}

        {activeMenu === 'colors' && (
          <div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              カレンダーやタスク作成時に表示される各色のラベルを好きな名前に変更できます。未設定の場合は空白になります。
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>暖色系</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                  {screeningColors.map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                      <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: c, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)' }} />
                      <input 
                        type="text" 
                        value={localLabels[c] || ''} 
                        onChange={e => setLocalLabels(prev => ({ ...prev, [c]: e.target.value }))}
                        placeholder="ラベル"
                        style={{ flex: 1, padding: '0.25rem 0.5rem', fontSize: '0.9rem', width: '100%', minWidth: 0 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>寒色系</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                  {infoColors.map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                      <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: c, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)' }} />
                      <input 
                        type="text" 
                        value={localLabels[c] || ''} 
                        onChange={e => setLocalLabels(prev => ({ ...prev, [c]: e.target.value }))}
                        placeholder="ラベル"
                        style={{ flex: 1, padding: '0.25rem 0.5rem', fontSize: '0.9rem', width: '100%', minWidth: 0 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem' }}>
              <button type="button" onClick={() => setActiveMenu(null)} className="btn-secondary">キャンセル</button>
              <button type="button" onClick={handleSaveColors} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Save size={20} /> 保存
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
