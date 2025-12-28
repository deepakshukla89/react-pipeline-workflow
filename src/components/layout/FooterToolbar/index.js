// FooterToolbar/index.js
// Figma-style footer toolbar with colored node icons and submit button

import { useState } from 'react';
import { Rocket } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { shallow } from 'zustand/shallow';
import { PayloadModal } from '../../modals/PayloadModal';
import { TOOLBAR_TOOLS } from '../../../config/nodeConfig';
import { useNodeCreation } from '../../../hooks/useNodeCreation';
import './FooterToolbar.css';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const FooterToolbar = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [showPayload, setShowPayload] = useState(false);
    const [hoveredTool, setHoveredTool] = useState(null);
    const createNode = useNodeCreation();

    const handleSubmit = () => {
        setShowPayload(true);
    };

    return (
        <>
            <div className="footer-toolbar">
                <div className="footer-toolbar__tools">
                    {TOOLBAR_TOOLS.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                            <button
                                key={tool.type}
                                className="footer-toolbar__tool"
                                onClick={() => createNode(tool.type)}
                                onMouseEnter={() => setHoveredTool(tool.type)}
                                onMouseLeave={() => setHoveredTool(null)}
                                style={{ color: tool.color }}
                            >
                                <IconComponent size={20} />
                                {hoveredTool === tool.type && (
                                    <div className="footer-toolbar__tooltip">
                                        <span className="footer-toolbar__tooltip-label">{tool.label}</span>
                                        <span className="footer-toolbar__tooltip-shortcut">{tool.shortcut}</span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="footer-toolbar__divider" />

                <button
                    className="footer-toolbar__submit"
                    onClick={handleSubmit}
                >
                    <Rocket size={18} />
                    <span>Submit</span>
                </button>
            </div>

            {showPayload && (
                <PayloadModal
                    nodes={nodes}
                    edges={edges}
                    onClose={() => setShowPayload(false)}
                />
            )}
        </>
    );
};
