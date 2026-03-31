'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface EditChange {
  id: string;
  original: string;
  updated: string;
}

interface EditModeContextType {
  isEditing: boolean;
  changes: EditChange[];
  registerChange: (id: string, original: string, updated: string) => void;
  toggleEditing: () => void;
  clearChanges: () => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [changes, setChanges] = useState<EditChange[]>([]);

  const registerChange = useCallback((id: string, original: string, updated: string) => {
    const trimmedOriginal = original.trim();
    const trimmedUpdated = updated.trim();
    if (trimmedOriginal === trimmedUpdated) return;
    setChanges(prev => {
      const existingIdx = prev.findIndex(c => c.id === id);
      const change: EditChange = { id, original: trimmedOriginal, updated: trimmedUpdated };
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = change;
        return next;
      }
      return [...prev, change];
    });
  }, []);

  const toggleEditing = useCallback(() => setIsEditing(v => !v), []);
  const clearChanges = useCallback(() => setChanges([]), []);

  return (
    <EditModeContext.Provider value={{ isEditing, changes, registerChange, toggleEditing, clearChanges }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error('useEditMode must be used within EditModeProvider');
  return ctx;
}
