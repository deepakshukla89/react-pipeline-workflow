// src/hooks/useNodeCreation.js
// Custom hook to centralize node creation logic

import { useCallback } from 'react';
import { useStore } from '../store';
import { NODE_SPAWN } from '../config/constants';

/**
 * Custom hook for creating new nodes.
 * Eliminates duplicate node creation logic in FooterToolbar and ShortcutsHelp.
 * 
 * @returns {Function} createNode - Function that takes nodeType and creates the node
 * 
 * @example
 * const createNode = useNodeCreation();
 * createNode('customInput'); // Creates a new input node
 */
export const useNodeCreation = () => {
    const addNode = useStore((state) => state.addNode);
    const getNodeID = useStore((state) => state.getNodeID);

    const createNode = useCallback((nodeType) => {
        const nodeID = getNodeID(nodeType);

        // Generate random position within spawn area
        const position = {
            x: NODE_SPAWN.baseX + Math.random() * NODE_SPAWN.randomRangeX,
            y: NODE_SPAWN.baseY + Math.random() * NODE_SPAWN.randomRangeY,
        };

        const newNode = {
            id: nodeID,
            type: nodeType,
            position,
            data: {
                id: nodeID,
                nodeType: nodeType
            },
        };

        addNode(newNode);
        return nodeID; // Return ID in case caller needs it
    }, [addNode, getNodeID]);

    return createNode;
};

export default useNodeCreation;
