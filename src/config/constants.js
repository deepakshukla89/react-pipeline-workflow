// src/config/constants.js
// Centralized configuration constants

// Canvas & Grid
export const GRID_SIZE = 40;
export const SNAP_THRESHOLD = 8;

// Default node position range (for random placement)
export const NODE_SPAWN = {
    baseX: 300,
    baseY: 200,
    randomRangeX: 200,
    randomRangeY: 100,
};

// Default node dimensions
export const DEFAULT_NODE = {
    width: 220,
    height: 100,
};

// LocalStorage keys
export const STORAGE_KEYS = {
    WELCOMED: 'pipeline-builder-welcomed',
};

// Edge styling
export const EDGE_STYLE = {
    stroke: '#94A3B8',
    strokeWidth: 2,
};

// Helper line styling
export const HELPER_LINE_STYLE = {
    stroke: '#F43F5E',
    strokeWidth: 1.5,
    strokeDasharray: '6,3',
};
