// ShortcutsHelp.js
// Floating help button with shortcuts popover + minimap toggle

import { useState, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { useStore } from './store';
import './ShortcutsHelp.css';

const shortcuts = [
    { key: 'I', action: 'Add Input Node' },
    { key: 'O', action: 'Add Output Node' },
    { key: 'L', action: 'Add LLM Node' },
    { key: 'T', action: 'Add Text Node' },
    { key: 'R', action: 'Add Translation Node' },
    { key: 'G', action: 'Add Image Gen Node' },
    { key: 'E', action: 'Add Emoji Node' },
    { key: 'A', action: 'Add API Call Node' },
    { key: 'F', action: 'Add Filter Node' },
    { key: 'M', action: 'Toggle Minimap' },
    { key: 'Del', action: 'Delete Selected' },
];

const nodeTypeMap = {
    'i': 'customInput',
    'o': 'customOutput',
    'l': 'llm',
    't': 'text',
    'r': 'translation',
    'g': 'imageGen',
    'e': 'emoji',
    'a': 'apiCall',
    'f': 'filter',
};

export const ShortcutsHelp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const addNode = useStore((state) => state.addNode);
    const getNodeID = useStore((state) => state.getNodeID);
    const toggleMinimap = useStore((state) => state.toggleMinimap);

    // Keyboard shortcuts handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore if typing in input/textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            // Ignore if any modifier key is pressed (Ctrl, Alt, Meta/Cmd)
            if (e.ctrlKey || e.altKey || e.metaKey) return;

            const key = e.key.toLowerCase();

            // Toggle minimap with M
            if (key === 'm') {
                e.preventDefault();
                toggleMinimap();
                return;
            }

            const nodeType = nodeTypeMap[key];

            if (nodeType) {
                e.preventDefault();
                const nodeID = getNodeID(nodeType);
                const newNode = {
                    id: nodeID,
                    type: nodeType,
                    position: { x: 300 + Math.random() * 200, y: 200 + Math.random() * 100 },
                    data: { id: nodeID, nodeType: nodeType },
                };
                addNode(newNode);
            }

            // Toggle help with ?
            if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [addNode, getNodeID, toggleMinimap]);

    return (
        <>
            <button
                className="shortcuts-help-btn"
                onClick={() => setIsOpen(true)}
                title="Keyboard Shortcuts"
            >
                <HelpCircle size={18} />
            </button>

            {isOpen && (
                <div className="shortcuts-popover">
                    <div className="shortcuts-popover__header">
                        <span>Keyboard Shortcuts</span>
                        <button className="shortcuts-popover__close" onClick={() => setIsOpen(false)}>
                            <X size={16} />
                        </button>
                    </div>
                    <div className="shortcuts-popover__list">
                        {shortcuts.map((shortcut) => (
                            <div key={shortcut.key} className="shortcuts-popover__item">
                                <span className="shortcuts-popover__action">{shortcut.action}</span>
                                <kbd className="shortcuts-popover__key">{shortcut.key}</kbd>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
