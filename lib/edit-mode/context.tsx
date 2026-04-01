'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export interface EditThread {
  id: string;
  sourceText: string;     // original JSX text — always labeled "Current ver."
  activeText: string;     // currently displayed on page
  variants: string[];     // alternative texts (labeled Option 1, 2, …)
  archived: string[];     // variants from previous approvals
  status: 'open' | 'approved';
}

interface EditModeContextType {
  isEditing: boolean;
  threads: Record<string, EditThread>;
  activePopupId: string | null;
  toggleEditing: () => void;
  openPopup: (id: string, sourceText: string) => void;
  closePopup: () => void;
  addVariant: (id: string, text: string) => void;
  swapVariant: (id: string, variantIndex: number) => void;
  swapSource: (id: string) => void;
  approveThread: (id: string) => void;
  reopenThread: (id: string) => void;
  removeVariant: (id: string, variantIndex: number) => void;
  saveThreads: () => Promise<boolean>;
  getActiveText: (id: string, sourceText: string) => string;
  pendingCount: number;
  approvedCount: number;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [threads, setThreads] = useState<Record<string, EditThread>>({});
  const [activePopupId, setActivePopupId] = useState<string | null>(null);

  // Load saved threads on mount
  useEffect(() => {
    fetch(`${BASE}/api/save-draft`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.threads) setThreads(data.threads);
      })
      .catch(() => {});
  }, []);

  const openPopup = useCallback((id: string, sourceText: string) => {
    setThreads(prev => {
      if (prev[id]) return prev;
      return {
        ...prev,
        [id]: { id, sourceText, activeText: sourceText, variants: [], archived: [], status: 'open' },
      };
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

  // Swap a variant onto the page. The previous active text (if not source) goes back to variants.
  const swapVariant = useCallback((id: string, variantIndex: number) => {
    setThreads(prev => {
      const t = prev[id];
      if (!t) return prev;
      const newVariants = [...t.variants];
      const swappedText = newVariants.splice(variantIndex, 1)[0];
      if (t.activeText !== t.sourceText) {
        newVariants.push(t.activeText);
      }
      return { ...prev, [id]: { ...t, activeText: swappedText, variants: newVariants } };
    });
  }, []);

  // Swap the source text back onto the page. The previous active goes to variants.
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
      return {
        ...prev,
        [id]: { ...t, status: 'approved', archived: [...t.archived, ...t.variants], variants: [] },
      };
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

  const saveThreads = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/api/save-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threads }),
      });
      return res.ok;
    } catch {
      await navigator.clipboard.writeText(JSON.stringify(threads, null, 2));
      return false;
    }
  }, [threads]);

  const getActiveText = useCallback((id: string, sourceText: string) => {
    const t = threads[id];
    return t ? t.activeText : sourceText;
  }, [threads]);

  const pendingCount = Object.values(threads).filter(
    t => t.status === 'open' && (t.variants.length > 0 || t.activeText !== t.sourceText)
  ).length;
  const approvedCount = Object.values(threads).filter(t => t.status === 'approved').length;

  const toggleEditing = useCallback(() => setIsEditing(v => !v), []);

  return (
    <EditModeContext.Provider value={{
      isEditing, threads, activePopupId,
      toggleEditing, openPopup, closePopup,
      addVariant, swapVariant, swapSource,
      approveThread, reopenThread, removeVariant,
      saveThreads, getActiveText,
      pendingCount, approvedCount,
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
