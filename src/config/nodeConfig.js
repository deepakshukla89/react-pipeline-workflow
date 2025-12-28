// src/config/nodeConfig.js
// Single source of truth for all node type configurations

import {
    Download, Upload, Bot, FileText,
    Languages, Image, Smile, Plug, Filter, StickyNote
} from 'lucide-react';

/**
 * Node configuration defining all metadata for each node type.
 * Used by: FooterToolbar, ShortcutsHelp, DraggableNode, nodeTypes registration
 */
export const NODE_CONFIG = {
    customInput: {
        type: 'customInput',
        label: 'Input',
        shortcut: 'I',
        shortcutKey: 'i',
        color: '#10B981',
        icon: Download,
        category: 'core',
    },
    customOutput: {
        type: 'customOutput',
        label: 'Output',
        shortcut: 'O',
        shortcutKey: 'o',
        color: '#EF4444',
        icon: Upload,
        category: 'core',
    },
    llm: {
        type: 'llm',
        label: 'LLM',
        shortcut: 'L',
        shortcutKey: 'l',
        color: '#8B5CF6',
        icon: Bot,
        category: 'core',
    },
    text: {
        type: 'text',
        label: 'Text',
        shortcut: 'T',
        shortcutKey: 't',
        color: '#3B82F6',
        icon: FileText,
        category: 'core',
    },
    translation: {
        type: 'translation',
        label: 'Translation',
        shortcut: 'R',
        shortcutKey: 'r',
        color: '#F59E0B',
        icon: Languages,
        category: 'processing',
    },
    imageGen: {
        type: 'imageGen',
        label: 'Image Gen',
        shortcut: 'G',
        shortcutKey: 'g',
        color: '#EC4899',
        icon: Image,
        category: 'processing',
    },
    emoji: {
        type: 'emoji',
        label: 'Emoji',
        shortcut: 'E',
        shortcutKey: 'e',
        color: '#FBBF24',
        icon: Smile,
        category: 'utilities',
    },
    apiCall: {
        type: 'apiCall',
        label: 'API Call',
        shortcut: 'A',
        shortcutKey: 'a',
        color: '#06B6D4',
        icon: Plug,
        category: 'utilities',
    },
    filter: {
        type: 'filter',
        label: 'Filter',
        shortcut: 'F',
        shortcutKey: 'f',
        color: '#14B8A6',
        icon: Filter,
        category: 'processing',
    },
    note: {
        type: 'note',
        label: 'Note',
        shortcut: 'N',
        shortcutKey: 'n',
        color: '#FBBF24',
        icon: StickyNote,
        category: 'utilities',
    },
};

// Helper: Get nodes by category
export const getNodesByCategory = (category) => {
    return Object.values(NODE_CONFIG).filter(node => node.category === category);
};

// Helper: Get node config by type
export const getNodeConfig = (type) => NODE_CONFIG[type];

// Helper: Create keyboard shortcut map (key -> nodeType)
export const SHORTCUT_MAP = Object.fromEntries(
    Object.values(NODE_CONFIG).map(node => [node.shortcutKey, node.type])
);

// Keyboard shortcuts for display (used in ShortcutsHelp modal)
export const KEYBOARD_SHORTCUTS = [
    ...Object.values(NODE_CONFIG).map(node => ({
        key: node.shortcut,
        action: `Add ${node.label} Node`,
    })),
    { key: 'M', action: 'Toggle Minimap' },
    { key: 'Del', action: 'Delete Selected' },
    { key: '?', action: 'Show Shortcuts' },
];

// All node types for toolbar display (excluding note for now as it was unused)
export const TOOLBAR_NODES = Object.values(NODE_CONFIG).filter(
    node => node.type !== 'note'
);

// Grouped by category for potential future use
export const NODES_BY_CATEGORY = {
    core: getNodesByCategory('core'),
    processing: getNodesByCategory('processing'),
    utilities: getNodesByCategory('utilities'),
};
