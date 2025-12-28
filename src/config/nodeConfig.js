import {
    Download,
    Upload,
    Bot,
    FileText,
    Languages,
    Image,
    Smile,
    Plug,
    Filter,
    StickyNote
} from 'lucide-react';

export const NODE_CONFIG = {
    customInput: {
        type: 'customInput',
        label: 'Input',
        icon: Download,
        shortcut: 'I',
        color: '#10B981',
        description: 'Input data point'
    },
    customOutput: {
        type: 'customOutput',
        label: 'Output',
        icon: Upload,
        shortcut: 'O',
        color: '#EF4444',
        description: 'Output data point'
    },
    llm: {
        type: 'llm',
        label: 'LLM',
        icon: Bot,
        shortcut: 'L',
        color: '#8B5CF6',
        description: 'Large Language Model'
    },
    text: {
        type: 'text',
        label: 'Text',
        icon: FileText,
        shortcut: 'T',
        color: '#3B82F6',
        description: 'Text block with variables'
    },
    translation: {
        type: 'translation',
        label: 'Translation',
        icon: Languages,
        shortcut: 'R',
        color: '#F59E0B',
        description: 'Translate text'
    },
    imageGen: {
        type: 'imageGen',
        label: 'Image Gen',
        icon: Image,
        shortcut: 'G',
        color: '#EC4899',
        description: 'Generate images'
    },
    emoji: {
        type: 'emoji',
        label: 'Emoji',
        icon: Smile,
        shortcut: 'E',
        color: '#FBBF24',
        description: 'Add emojis'
    },
    apiCall: {
        type: 'apiCall',
        label: 'API Call',
        icon: Plug,
        shortcut: 'A',
        color: '#06B6D4',
        description: 'Make HTTP requests'
    },
    filter: {
        type: 'filter',
        label: 'Filter',
        icon: Filter,
        shortcut: 'F',
        color: '#14B8A6',
        description: 'Filter data streams'
    },
    note: {
        type: 'note',
        label: 'Note',
        icon: StickyNote,
        // No shortcut assigned in original, can assign one if needed
        color: '#FBBF24',
        description: 'Sticky note'
    }
};

// Helper to get config by shortcut key (lowercase)
export const getNodeTypeByShortcut = (key) => {
    const entry = Object.values(NODE_CONFIG).find(
        config => config.shortcut?.toLowerCase() === key.toLowerCase()
    );
    return entry ? entry.type : null;
};

// List for toolbar iteration
export const TOOLBAR_TOOLS = Object.values(NODE_CONFIG);
