// FooterToolbar.js
// Figma-style footer toolbar with colored node icons and submit button

import { useState } from 'react';
import {
    Download, Upload, Bot, FileText,
    Languages, Image, Smile, Plug, Filter,
    Rocket
} from 'lucide-react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { PayloadModal } from './PayloadModal';
import './FooterToolbar.css';

const nodeTools = [
    { type: 'customInput', icon: Download, label: 'Input', shortcut: 'I', color: '#10B981' },
    { type: 'customOutput', icon: Upload, label: 'Output', shortcut: 'O', color: '#EF4444' },
    { type: 'llm', icon: Bot, label: 'LLM', shortcut: 'L', color: '#8B5CF6' },
    { type: 'text', icon: FileText, label: 'Text', shortcut: 'T', color: '#3B82F6' },
    { type: 'translation', icon: Languages, label: 'Translation', shortcut: 'R', color: '#F59E0B' },
    { type: 'imageGen', icon: Image, label: 'Image Gen', shortcut: 'G', color: '#EC4899' },
    { type: 'emoji', icon: Smile, label: 'Emoji', shortcut: 'E', color: '#FBBF24' },
    { type: 'apiCall', icon: Plug, label: 'API Call', shortcut: 'A', color: '#06B6D4' },
    { type: 'filter', icon: Filter, label: 'Filter', shortcut: 'F', color: '#14B8A6' },
];

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    addNode: state.addNode,
    getNodeID: state.getNodeID,
});

export const FooterToolbar = () => {
    const { nodes, edges, addNode, getNodeID } = useStore(selector, shallow);
    const [showPayload, setShowPayload] = useState(false);
    const [hoveredTool, setHoveredTool] = useState(null);

    const handleToolClick = (type) => {
        const nodeID = getNodeID(type);
        const newNode = {
            id: nodeID,
            type,
            position: { x: 300 + Math.random() * 200, y: 200 + Math.random() * 100 },
            data: { id: nodeID, nodeType: type },
        };
        addNode(newNode);
    };

    const handleSubmit = () => {
        setShowPayload(true);
    };

    return (
        <>
            <div className="footer-toolbar">
                <div className="footer-toolbar__tools">
                    {nodeTools.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                            <button
                                key={tool.type}
                                className="footer-toolbar__tool"
                                onClick={() => handleToolClick(tool.type)}
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
