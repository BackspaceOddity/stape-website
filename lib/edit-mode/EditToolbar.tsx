'use client';

import { useEffect, useState } from 'react';
import { useEditMode } from './context';

/**
 * Floating toolbar for in-browser text editing.
 * Only visible when the URL contains `?edit` (e.g. http://localhost:3000/stape-website?edit).
 *
 * Workflow:
 * 1. Navigate to any page with ?edit in the URL.
 * 2. Click "Edit Mode" to enable editing — editable texts show a dashed underline.
 * 3. Click any underlined text and type your changes.
 * 4. Click "Save Draft" — writes _draft-edits.json to the project root.
 * 5. Tell Claude "apply my saved edits" — Claude reads the JSON and updates source files.
 */
export function EditToolbar() {
  const { isEditing, changes, toggleEditing, clearChanges } = useEditMode();
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setVisible(params.has('edit'));
  }, []);

  if (!visible) return null;

  async function saveDraft() {
    if (changes.length === 0) return;
    setSaving(true);
    setSavedMsg('');

    try {
      const res = await fetch('/stape-website/api/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      });
      if (res.ok) {
        setSavedMsg(`✓ ${changes.length} change${changes.length !== 1 ? 's' : ''} saved`);
        setTimeout(() => setSavedMsg(''), 4000);
      } else {
        setSavedMsg('Error saving — copy JSON below');
      }
    } catch {
      // API not available (e.g. on static export) — copy to clipboard as fallback
      await navigator.clipboard.writeText(JSON.stringify(changes, null, 2));
      setSavedMsg('✓ Copied to clipboard — paste to Claude');
      setTimeout(() => setSavedMsg(''), 5000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#111827',
        color: '#f9fafb',
        padding: '10px 18px',
        borderRadius: '9999px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        border: '1px solid #374151',
        fontSize: '13px',
        fontFamily: 'system-ui, sans-serif',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Edit mode toggle */}
      <button
        onClick={toggleEditing}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 12px',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          background: isEditing ? '#3b82f6' : '#374151',
          color: isEditing ? '#fff' : '#d1d5db',
          transition: 'background 0.15s',
        }}
      >
        ✏️ {isEditing ? 'Editing ON' : 'Edit Mode'}
      </button>

      {/* Change count + actions */}
      {changes.length > 0 && (
        <>
          <span style={{ color: '#9ca3af' }}>
            {changes.length} change{changes.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={saveDraft}
            disabled={saving}
            style={{
              padding: '5px 14px',
              borderRadius: '9999px',
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              background: '#22c55e',
              color: '#fff',
              opacity: saving ? 0.6 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
          <button
            onClick={clearChanges}
            title="Discard all changes"
            style={{
              padding: '4px 8px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              background: 'transparent',
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </>
      )}

      {savedMsg && (
        <span style={{ color: '#86efac', fontWeight: 500 }}>{savedMsg}</span>
      )}
    </div>
  );
}
