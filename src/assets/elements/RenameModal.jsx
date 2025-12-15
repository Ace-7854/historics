import { useState, useEffect, useRef } from 'react';

export default function RenameModal({ isOpen, currentName, onRename, onClose }) {
    const [newName, setNewName] = useState(currentName);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setNewName(currentName);
            // Focus input when modal opens
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, currentName]);

    function handleSubmit(e) {
        e.preventDefault();
        if (newName.trim() && newName.trim() !== currentName) {
            onRename(newName.trim());
        }
        onClose();
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Rename Chat</h3>
                    <button 
                        className="modal-close" 
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <label htmlFor="chat-name">Chat Name:</label>
                        <input
                            ref={inputRef}
                            id="chat-name"
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            maxLength={50}
                            placeholder="Enter new chat name"
                            className="rename-input"
                        />
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn-secondary" 
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn-primary"
                            disabled={!newName.trim() || newName.trim() === currentName}
                        >
                            Rename
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}