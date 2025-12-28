// noteNode.js
// Simple sticky note for comments - now synced to store

import { useLayoutEffect, useRef } from 'react';
import { StickyNote } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useNodeField } from '../hooks/useNodeField';

export const NoteNode = ({ id, data }) => {
    const [note, handleNoteChange] = useNodeField(id, 'note', data?.note || 'Add your notes here...');
    const textareaRef = useRef(null);

    // Auto-resize note
    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [note]);

    return (
        <BaseNode
            id={id}
            title="Note"
            icon={<StickyNote size={16} />}
            nodeType="note"
            inputs={[]}
            outputs={[]}
        >
            <textarea
                ref={textareaRef}
                value={note}
                onChange={(e) => handleNoteChange(e.target.value)}
                className="base-node__textarea"
                placeholder="Add notes..."
                style={{
                    minHeight: '50px',
                    background: 'var(--color-warning-light)',
                    borderColor: 'var(--color-node-note)'
                }}
            />
        </BaseNode>
    );
};
