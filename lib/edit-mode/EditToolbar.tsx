'use client';

import { useEffect, useState } from 'react';
import { useEditMode } from './context';

export function EditToolbar() {
  const { isEditing, toggleEditing, pendingCount, approvedCount, saveThreads } = useEditMode();
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    setVisible(new URLSearchParams(window.location.search).has('edit'));
  }, []);

  if (!visible) return null;

  async function handleSave() {
    setSaving(true);
    setSavedMsg('');
    const ok = await saveThreads();
    setSavedMsg(ok ? '✓ Saved' : '✓ Copied to clipboard');
    setSaving(false);
    setTimeout(() => setSavedMsg(''), 3000);
  }

  const total = pendingCount + approvedCount;

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, display: 'flex', alignItems: 'center', gap: 10,
      background: '#111827', color: '#f9fafb', padding: '10px 18px',
      borderRadius: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      border: '1px solid #374151', fontSize: 13,
      fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap',
    }}>
      {/* Edit mode toggle */}
      <button
        onClick={toggleEditing}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 12px', borderRadius: 9999, border: 'none',
          cursor: 'pointer', fontSize: 13, fontWeight: 600,
          background: isEditing ? '#3b82f6' : '#374151',
          color: isEditing ? '#fff' : '#d1d5db',
          transition: 'background 0.15s',
        }}
      >
        ✏️ {isEditing ? 'Editing ON' : 'Edit Mode'}
      </button>

      {/* Thread counters */}
      {total > 0 && (
        <>
          {pendingCount > 0 && <span style={{ color: '#fbbf24' }}>{pendingCount} open</span>}
          {approvedCount > 0 && <span style={{ color: '#86efac' }}>{approvedCount} approved</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '5px 14px', borderRadius: 9999, border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: 13, fontWeight: 600,
              background: '#22c55e', color: '#fff',
              opacity: saving ? 0.6 : 1, transition: 'opacity 0.15s',
            }}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </>
      )}

      {savedMsg && <span style={{ color: '#86efac', fontWeight: 500 }}>{savedMsg}</span>}
    </div>
  );
}
