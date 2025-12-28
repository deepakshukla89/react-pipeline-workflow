import { useEffect } from 'react';
import { useStore } from '../store/useStore'; // Ensure path is correct
import { useNodeCreation } from './useNodeCreation';
import { getNodeTypeByShortcut } from '../config/nodeConfig';

export const useKeyboardShortcuts = (toggleHelp) => {
    const createNode = useNodeCreation();
    const toggleMinimap = useStore((state) => state.toggleMinimap);

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

            // Check if key matches a node shortcut
            const nodeType = getNodeTypeByShortcut(key);
            if (nodeType) {
                e.preventDefault();
                createNode(nodeType);
            }

            // Toggle help with ?
            if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                toggleHelp(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [createNode, toggleMinimap, toggleHelp]);
};
