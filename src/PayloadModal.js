// PayloadModal.js
// Modal to display pipeline payload

import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import './PayloadModal.css';

export const PayloadModal = ({ nodes, edges, onClose }) => {
    const [copied, setCopied] = useState(false);

    const payload = {
        nodes: nodes.map(node => ({
            id: node.id,
            type: node.type,
            position: { x: Math.round(node.position.x), y: Math.round(node.position.y) },
            data: node.data
        })),
        edges: edges.map(edge => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle || null,
            targetHandle: edge.targetHandle || null
        }))
    };

    const jsonString = JSON.stringify(payload, null, 2);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(jsonString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="payload-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h3>Pipeline Payload</h3>
                    <button className="modal__close" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="payload-modal__info">
                    <span><strong>{nodes.length}</strong> nodes</span>
                    <span><strong>{edges.length}</strong> edges</span>
                </div>

                <div className="payload-modal__code-container">
                    <button className="payload-modal__copy" onClick={handleCopy}>
                        {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                    </button>
                    <pre className="payload-modal__code">{jsonString}</pre>
                </div>

                <div className="modal__footer">
                    <button className="modal__btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
