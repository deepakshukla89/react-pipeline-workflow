import { useCallback } from 'react';
import { useStore } from '../store/useStore';
import {
    INITIAL_NODE_POS_X,
    INITIAL_NODE_POS_Y,
    POS_RANDOMNESS_X,
    POS_RANDOMNESS_Y
} from '../config/constants';

export const useNodeCreation = () => {
    const addNode = useStore((state) => state.addNode);
    const getNodeID = useStore((state) => state.getNodeID);

    const createNode = useCallback((type) => {
        const nodeID = getNodeID(type);
        const newNode = {
            id: nodeID,
            type,
            position: {
                x: INITIAL_NODE_POS_X + Math.random() * POS_RANDOMNESS_X,
                y: INITIAL_NODE_POS_Y + Math.random() * POS_RANDOMNESS_Y
            },
            data: { id: nodeID, nodeType: type },
        };
        addNode(newNode);
    }, [addNode, getNodeID]);

    return createNode;
};
