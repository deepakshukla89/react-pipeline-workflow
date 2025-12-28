// toolbar.js
// Node palette with all available node types

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar__section">
                <span className="toolbar__section-title">Core Nodes</span>
                <div className="toolbar__nodes">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                </div>
            </div>
            <div className="toolbar__section">
                <span className="toolbar__section-title">Processing</span>
                <div className="toolbar__nodes">
                    <DraggableNode type='translation' label='Translation' />
                    <DraggableNode type='imageGen' label='Image Gen' />
                    <DraggableNode type='filter' label='Filter' />
                </div>
            </div>
            <div className="toolbar__section">
                <span className="toolbar__section-title">Utilities</span>
                <div className="toolbar__nodes">
                    <DraggableNode type='apiCall' label='API Call' />
                    <DraggableNode type='note' label='Note' />
                </div>
            </div>
        </div>
    );
};
