// store.js
// Zustand store with helper lines state

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';
import { getHelperLines } from '../features/canvas/utils/helperLines';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  showMinimap: false,
  helperLineHorizontal: null,
  helperLineVertical: null,

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },

  onNodesChange: (changes) => {
    // Check for position changes (dragging)
    let helperLineHorizontal = null;
    let helperLineVertical = null;

    const modifiedChanges = changes.map((change) => {
      if (change.type === 'position' && change.dragging) {
        const helperLines = getHelperLines(change, get().nodes);

        helperLineHorizontal = helperLines.horizontal;
        helperLineVertical = helperLines.vertical;

        // Apply snap if found
        if (helperLines.snapX !== null || helperLines.snapY !== null) {
          return {
            ...change,
            position: {
              x: helperLines.snapX !== null ? helperLines.snapX : change.position.x,
              y: helperLines.snapY !== null ? helperLines.snapY : change.position.y,
            },
          };
        }
      }
      return change;
    });

    set({
      nodes: applyNodeChanges(modifiedChanges, get().nodes),
      helperLineHorizontal,
      helperLineVertical,
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge({
        ...connection,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#94A3B8', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' }
      }, get().edges),
    });
  },

  toggleMinimap: () => {
    set({ showMinimap: !get().showMinimap });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
}));
