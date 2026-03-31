'use client';

import { useRef, useEffect } from 'react';
import { useEditMode } from './context';

interface Props {
  id: string;
  children: string;
}

/**
 * Wraps a text string to make it editable in-place when Edit Mode is active.
 * Usage: <EditableText id="hero.headline">Some text here</EditableText>
 *
 * In normal mode: renders the text as-is (no DOM impact).
 * In edit mode: renders as a contenteditable inline span with a dashed blue outline.
 * On blur, registers the change so the toolbar can save it.
 */
export function EditableText({ id, children }: Props) {
  const { isEditing, registerChange } = useEditMode();
  const ref = useRef<HTMLSpanElement>(null);

  // Populate initial text when entering edit mode; React doesn't manage
  // the content of contentEditable elements after initial mount.
  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.textContent = children;
    }
  }, [isEditing]); // intentionally omit `children` — we only want to seed on mode-toggle

  if (!isEditing) {
    return <>{children}</>;
  }

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-edit-id={id}
      onBlur={() => {
        const updated = ref.current?.textContent ?? '';
        registerChange(id, children, updated);
      }}
      // Prevent Enter from inserting <br> or <div>
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      style={{
        borderBottom: '1.5px dashed #60a5fa',
        borderRadius: '2px',
        cursor: 'text',
        outline: 'none',
        display: 'inline',
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(96,165,250,0.08)';
      }}
      onBlurCapture={(e) => {
        (e.currentTarget as HTMLElement).style.background = '';
      }}
    />
  );
}
