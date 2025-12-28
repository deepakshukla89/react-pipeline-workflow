// ShortcutsHelp/index.js
// Floating help button with shortcuts popover + minimap toggle

import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';
import { TOOLBAR_TOOLS } from '../../../config/nodeConfig';
import './ShortcutsHelp.css';

export const ShortcutsHelp = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Register keyboard shortcuts
    useKeyboardShortcuts(setIsOpen);

    // Generate shortcuts list from config
    const shortcutsList = [
        ...TOOLBAR_TOOLS.map(tool => ({
            key: tool.shortcut,
            action: `Add ${tool.label} Node`
        })),
        { key: 'M', action: 'Toggle Minimap' },
        { key: 'Del', action: 'Delete Selected' },
        { key: '?', action: 'Toggle Help' }
    ];

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
                        {shortcutsList.map((shortcut) => (
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
