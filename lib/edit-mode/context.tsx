'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

/* ── Thread-based text editing ── */

export interface EditThread {
  id: string;
  sourceText: string;
  activeText: string;
  variants: string[];
  archived: string[];
  status: 'open' | 'approved';
}

/* ── Visual edit requests ── */

export interface VisualEditElement {
  component: string;   // from data-component attr (nearest ancestor)
  tag: string;
  className: string;
  textContent: string; // first 200 chars
  selector: string;    // CSS selector path
  styles: Record<string, string>;
}

export interface VisualEditRequest {
  id: string;
  prompt: string;
  element: VisualEditElement;
  status: 'pending' | 'applied';
  createdAt: string;
}

/* ── Context type ── */

type Mode = 'off' | 'text' | 'visual';

interface EditModeContextType {
  mode: Mode;
  isEditing: boolean;      // shorthand for mode === 'text'
  isVisualMode: boolean;   // shorthand for mode === 'visual'
  toggleTextMode: () => void;
  toggleVisualMode: () => void;

  // Text threads
  threads: Record<string, EditThread>;
  activePopupId: string | null;
  openPopup: (id: string, sourceText: string) => void;
  closePopup: () => void;
  addVariant: (id: string, text: string) => void;
  swapVariant: (id: string, variantIndex: number) => void;
  swapSource: (id: string) => void;
  approveThread: (id: string) => void;
  reopenThread: (id: string) => void;
  removeVariant: (id: string, variantIndex: number) => void;
  getActiveText: (id: string, sourceText: string) => string;
  pendingCount: number;
  approvedCount: number;

  // Visual edits
  visualEdits: VisualEditRequest[];
  addVisualEdit: (edit: { prompt: string; element: VisualEditElement }) => void;
  removeVisualEdit: (id: string) => void;

  // Persistence
  saveAll: () => Promise<boolean>;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('off');
  const [threads, setThreads] = useState<Record<string, EditThread>>({});
  const [activePopupId, setActivePopupId] = useState<string | null>(null);
  const [visualEdits, setVisualEdits] = useState<VisualEditRequest[]>([]);

  const isEditing = mode === 'text';
  const isVisualMode = mode === 'visual';

  // Load saved data on mount
  useEffect(() => {
    fetch(`${BASE}/api/save-draft`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.threads) setThreads(data.threads);
        if (data?.visualEdits) setVisualEdits(data.visualEdits);
      })
      .catch(() => {});
  }, []);

  const toggleTextMode = useCallback(() => setMode(m => m === 'text' ? 'off' : 'text'), []);
  const toggleVisualMode = useCallback(() => {
    setMode(m => m === 'visual' ? 'off' : 'visual');
    setActivePopupId(null);
  }, []);

  /* ── Text thread methods ── */

  const openPopup = useCallback((id: string, sourceText: string) => {
    setThreads(prev => {
      if (prev[id]) return prev;
      return { ...prev, [id]: { id, sourceText, activeText: sourceText, variants: [], archived: [], status: 'open' } };
    });
    setActivePopupId(id);
  }, []);

  const closePopup = useCallback(() => setActivePopupId(null), []);

  const addVariant = useCallback((id: string, text: string) => {
    setThreads(prev => {
      const t = prev[id];
      if (!t) return prev;
      return { ...prev, [id]: { ...t, variants: [...t.variants, text.trim()] } };
    });
  }, []);

  const swapVariant = useCallback((id: string, variantIndex: number) => {
    setThreads(prev => {
      const t = prev[id];
      if (!t) return prev;
      const newVariants = [...t.variants];
      const swappedText = newVariants.splice(variantIndex, 1)[0];
      if (t.activeText !== t.sourceText) newVariants.push(t.activeText);
      return { ...prev, [id]: { ...t, activeText: swappedText, variants: newVariants } };
    });
  }, []);

  const swapSource = useCallback((id: string) => {
    setThreads(prev => {
      const t = prev[id];
      if (!t || t.activeText === t.sourceText) return prev;
      return { ...prev, [id]: { ...t, activeText: t.sourceText, variants: [...t.variants, t.activeText] } };
    });
  }, []);

  const approveThread = useCallback((id: string) => {
    setThreads(prev => {
      const t = prev[id];
      if (!t) return prev;
      return { ...prev, [id]: { ...t, status: 'approved', archived: [...t.archived, ...t.variants], variants: [] } };
    });
    setActivePopupId(null);
  }, []);

  const reopenThread = useCallback((id: string) => {
    setThreads(prev => {
      const t = prev[id];
      if (!t) return prev;
      return { ...prev, [id]: { ...t, status: 'open', variants: [...t.archived], archived: [] } };
    });
  }, []);

  const removeVariant = useCallback((id: string, variantIndex: number) => {
    setThreads(prev => {
      const t = prev[id];
      if (!t) return prev;
      return { ...prev, [id]: { ...t, variants: t.variants.filter((_, i) => i !== variantIndex) } };
    });
  }, []);

  const getActiveText = useCallback((id: string, sourceText: string) => {
    const t = threads[id];
    return t ? t.activeText : sourceText;
  }, [threads]);

  const pendingCount = Object.values(threads).filter(t => t.status === 'open' && (t.variants.length > 0 || t.activeText !== t.sourceText)).length;
  const approvedCount = Object.values(threads).filter(t => t.status === 'approved').length;

  /* ── Visual edit methods ── */

  const addVisualEdit = useCallback((edit: { prompt: string; element: VisualEditElement }) => {
    const request: VisualEditRequest = {
      id: `ve-${Date.now()}`,
      ...edit,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setVisualEdits(prev => [...prev, request]);
  }, []);

  const removeVisualEdit = useCallback((id: string) => {
    setVisualEdits(prev => prev.filter(e => e.id !== id));
  }, []);

  /* ── Persistence ── */

  const saveAll = useCallback(async () => {
    const payload = { threads, visualEdits };
    try {
      const res = await fetch(`${BASE}/api/save-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      return false;
    }
  }, [threads, visualEdits]);

  return (
    <EditModeContext.Provider value={{
      mode, isEditing, isVisualMode,
      toggleTextMode, toggleVisualMode,
      threads, activePopupId,
      openPopup, closePopup,
      addVariant, swapVariant, swapSource,
      approveThread, reopenThread, removeVariant,
      getActiveText, pendingCount, approvedCount,
      visualEdits, addVisualEdit, removeVisualEdit,
      saveAll,
    }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error('useEditMode must be used within EditModeProvider');
  return ctx;
}
