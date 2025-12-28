// HelperLinesRenderer.js
// Renders visual alignment guide lines with proper viewport transform

import { useViewport } from 'reactflow';
import { useStore } from './store';

export const HelperLinesRenderer = () => {
    const horizontal = useStore((state) => state.helperLineHorizontal);
    const vertical = useStore((state) => state.helperLineVertical);
    const { x: viewX, y: viewY, zoom } = useViewport();

    if (horizontal === null && vertical === null) {
        return null;
    }

    // Transform node coordinates to screen coordinates
    const transformX = (nodeX) => nodeX * zoom + viewX;
    const transformY = (nodeY) => nodeY * zoom + viewY;

    return (
        <svg
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 1000,
            }}
        >
            {horizontal !== null && (
                <line
                    x1="0"
                    x2="100%"
                    y1={transformY(horizontal)}
                    y2={transformY(horizontal)}
                    stroke="#F43F5E"
                    strokeWidth={1.5}
                    strokeDasharray="6,3"
                />
            )}
            {vertical !== null && (
                <line
                    x1={transformX(vertical)}
                    x2={transformX(vertical)}
                    y1="0"
                    y2="100%"
                    stroke="#F43F5E"
                    strokeWidth={1.5}
                    strokeDasharray="6,3"
                />
            )}
        </svg>
    );
};
