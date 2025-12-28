// helperLines.js
// Smart alignment guides helper - improved version

const SNAP_THRESHOLD = 8; // pixels to trigger snap

// Get alignment lines between dragging node and other nodes
export function getHelperLines(change, nodes) {
    const result = {
        horizontal: null,
        vertical: null,
        snapX: null,
        snapY: null,
    };

    // Only process position changes
    if (change.type !== 'position' || !change.dragging || !change.position) {
        return result;
    }

    const draggingNode = nodes.find((n) => n.id === change.id);
    if (!draggingNode) return result;

    // Use dimensions from node or defaults
    const dragWidth = draggingNode.width || 220;
    const dragHeight = draggingNode.height || 100;

    // Calculate dragging node bounds using the NEW position from change
    const dragBounds = {
        left: change.position.x,
        right: change.position.x + dragWidth,
        top: change.position.y,
        bottom: change.position.y + dragHeight,
        centerX: change.position.x + dragWidth / 2,
        centerY: change.position.y + dragHeight / 2,
    };

    // Check against all other nodes
    for (const node of nodes) {
        if (node.id === change.id) continue;

        const nodeWidth = node.width || 220;
        const nodeHeight = node.height || 100;

        const nodeBounds = {
            left: node.position.x,
            right: node.position.x + nodeWidth,
            top: node.position.y,
            bottom: node.position.y + nodeHeight,
            centerX: node.position.x + nodeWidth / 2,
            centerY: node.position.y + nodeHeight / 2,
        };

        // Vertical alignments (X axis)
        // Left edges
        if (Math.abs(dragBounds.left - nodeBounds.left) < SNAP_THRESHOLD) {
            result.vertical = nodeBounds.left;
            result.snapX = nodeBounds.left;
        }
        // Right edges
        else if (Math.abs(dragBounds.right - nodeBounds.right) < SNAP_THRESHOLD) {
            result.vertical = nodeBounds.right;
            result.snapX = nodeBounds.right - dragWidth;
        }
        // Center X
        else if (Math.abs(dragBounds.centerX - nodeBounds.centerX) < SNAP_THRESHOLD) {
            result.vertical = nodeBounds.centerX;
            result.snapX = nodeBounds.centerX - dragWidth / 2;
        }

        // Horizontal alignments (Y axis)
        // Top edges
        if (Math.abs(dragBounds.top - nodeBounds.top) < SNAP_THRESHOLD) {
            result.horizontal = nodeBounds.top;
            result.snapY = nodeBounds.top;
        }
        // Bottom edges
        else if (Math.abs(dragBounds.bottom - nodeBounds.bottom) < SNAP_THRESHOLD) {
            result.horizontal = nodeBounds.bottom;
            result.snapY = nodeBounds.bottom - dragHeight;
        }
        // Center Y
        else if (Math.abs(dragBounds.centerY - nodeBounds.centerY) < SNAP_THRESHOLD) {
            result.horizontal = nodeBounds.centerY;
            result.snapY = nodeBounds.centerY - dragHeight / 2;
        }

        // If we found both, we can stop
        if (result.horizontal !== null && result.vertical !== null) {
            break;
        }
    }

    return result;
}
