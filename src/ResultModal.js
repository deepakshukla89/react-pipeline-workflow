// ResultModal.js
// Modal component to display backend response with Lucide icons

import { X, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import './ResultModal.css';

export const ResultModal = ({ result, error, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal__close" onClick={onClose}>
                    <X size={18} />
                </button>

                {error ? (
                    <>
                        <div className="modal__icon modal__icon--error">
                            <XCircle size={48} />
                        </div>
                        <h2 className="modal__title">Connection Error</h2>
                        <p className="modal__message">{error}</p>
                        <p className="modal__hint">
                            Make sure the backend is running:<br />
                            <code>cd backend && uvicorn main:app --reload</code>
                        </p>
                    </>
                ) : result ? (
                    <>
                        <div className="modal__icon modal__icon--success">
                            <CheckCircle size={48} />
                        </div>
                        <h2 className="modal__title">Pipeline Analysis</h2>

                        <div className="modal__stats">
                            <div className="modal__stat">
                                <span className="modal__stat-value">{result.num_nodes}</span>
                                <span className="modal__stat-label">Nodes</span>
                            </div>
                            <div className="modal__stat">
                                <span className="modal__stat-value">{result.num_edges}</span>
                                <span className="modal__stat-label">Edges</span>
                            </div>
                            <div className="modal__stat">
                                <span className={`modal__stat-value ${result.is_dag ? 'text-success' : 'text-danger'}`}>
                                    {result.is_dag ? 'Yes' : 'No'}
                                </span>
                                <span className="modal__stat-label">Valid DAG</span>
                            </div>
                        </div>

                        <div className={`modal__dag-status ${result.is_dag ? 'modal__dag-status--valid' : 'modal__dag-status--invalid'}`}>
                            {result.is_dag ? (
                                <>
                                    <CheckCircle size={16} />
                                    This pipeline is a valid Directed Acyclic Graph
                                </>
                            ) : (
                                <>
                                    <AlertTriangle size={16} />
                                    This pipeline contains cycles or is not properly connected
                                </>
                            )}
                        </div>
                    </>
                ) : null}

                <button className="modal__button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};
