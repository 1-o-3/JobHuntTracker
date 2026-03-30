"use client";

import { useTasks } from '@/context/TaskContext';
import { X, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SettingsModal({ isOpen, onClose }) {
  const { colorLabels, updateColorLabel } = useTasks();
  const [localLabels, setLocalLabels] = useState({});

  useEffect(() => {
    setLocalLabels(colorLabels);
  }, [colorLabels, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    Object.keys(localLabels).forEach(key => {
      updateColorLabel(key, localLabels[key]);
    });
    onClose();
  };

  const screeningColors = ['#fef08a', '#fde047', '#facc15', '#eab308', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#fca5a5', '#f87171', '#ef4444', '#dc2626'];
  const infoColors = ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#6ee7b7', '#34d399', '#10b981', '#059669', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7'];

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>⚙️ カラータグ設定</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)' }}><X size={24} /></button>
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          カレンダーやタスク作成時に表示される各色のラベルを好きな名前に変更できます。未設定の場合は空白になります。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>審査系（暖色）</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {screeningColors.map(c => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                  <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: c, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)' }} />
                  <input 
                    type="text" 
                    value={localLabels[c] || ''} 
                    onChange={e => setLocalLabels(prev => ({ ...prev, [c]: e.target.value }))}
                    placeholder="ラベル (例: 1次面接)"
                    style={{ flex: 1, padding: '0.25rem 0.5rem', fontSize: '0.9rem', width: '100%', minWidth: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>説明会・その他（寒色）</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {infoColors.map(c => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                  <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: c, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)' }} />
                  <input 
                    type="text" 
                    value={localLabels[c] || ''} 
                    onChange={e => setLocalLabels(prev => ({ ...prev, [c]: e.target.value }))}
                    placeholder="ラベル (例: 会社説明会)"
                    style={{ flex: 1, padding: '0.25rem 0.5rem', fontSize: '0.9rem', width: '100%', minWidth: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem' }}>
          <button type="button" onClick={onClose} className="btn-secondary">キャンセル</button>
          <button type="button" onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={20} /> 保存
          </button>
        </div>
      </div>
    </div>
  );
}
