// submit.js
// Submit button with backend integration and Lucide icons

import { useState } from 'react';
import { Rocket, Loader2 } from 'lucide-react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ResultModal } from './ResultModal';
import './submit.css';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Sanitize nodes and edges - remove circular React Flow internal objects
            const sanitizedNodes = nodes.map(node => ({
                id: node.id,
                type: node.type,
                position: node.position,
                data: node.data,
            }));

            const sanitizedEdges = edges.map(edge => ({
                id: edge.id,
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle,
            }));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: sanitizedNodes,
                    edges: sanitizedEdges,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'Failed to connect to backend');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setResult(null);
        setError(null);
    };

    return (
        <>
            <div className="submit-container">
                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="submit-button__spinner" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Rocket size={18} />
                            Submit Pipeline
                        </>
                    )}
                </button>
                <span className="submit-info">
                    {nodes.length} nodes • {edges.length} edges
                </span>
            </div>

            {(result || error) && (
                <ResultModal
                    result={result}
                    error={error}
                    onClose={closeModal}
                />
            )}
        </>
    );
};
