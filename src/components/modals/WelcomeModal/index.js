// WelcomeModal.js
// First-time visitor welcome modal

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './WelcomeModal.css';

const STORAGE_KEY = 'pipeline-builder-welcomed';

export const WelcomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem(STORAGE_KEY);
        if (!hasSeenWelcome) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h3>Welcome to Pipeline Builder</h3>
                    <button className="modal__close" onClick={handleClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="modal__body">
                    <p>A visual tool to build and connect pipeline nodes.</p>

                    <ul className="modal__list">
                        <li>Use the <strong>toolbar</strong> or <strong>keyboard shortcuts</strong> to add nodes</li>
                        <li>Press <kbd>?</kbd> to view all shortcuts</li>
                        <li>Hold <kbd>Space</kbd> to pan the canvas</li>
                        <li>Click <strong>Submit</strong> to view the pipeline JSON</li>
                    </ul>

                    <p className="modal__note">
                        Note: I don't know Python FastAPI, so Submit shows the payload instead of making API calls.
                    </p>
                </div>

                <div className="modal__footer">
                    <button className="modal__btn" onClick={handleClose}>
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};
