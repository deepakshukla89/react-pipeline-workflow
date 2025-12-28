// emojiNode.js
// With store sync for payload

import { useState, useCallback } from 'react';
import { Smile } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { useStore } from '../store';

const emojiOptions = [
    { value: '👍', label: '👍 Thumbs Up' },
    { value: '❤️', label: '❤️ Heart' },
    { value: '⭐', label: '⭐ Star' },
    { value: '🎯', label: '🎯 Target' },
    { value: '🚀', label: '🚀 Rocket' },
    { value: '✅', label: '✅ Check' },
    { value: '❌', label: '❌ Cross' },
    { value: '⚠️', label: '⚠️ Warning' },
    { value: '💡', label: '💡 Idea' },
    { value: '🔥', label: '🔥 Fire' },
    { value: '💬', label: '💬 Comment' },
    { value: '📌', label: '📌 Pin' },
];

export const EmojiNode = ({ id, data }) => {
    const [emoji, setEmoji] = useState(data?.emoji || '⭐');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleEmojiChange = useCallback((value) => {
        setEmoji(value);
        updateNodeField(id, 'emoji', value);
    }, [id, updateNodeField]);

    return (
        <BaseNode
            id={id}
            title="Emoji"
            icon={<Smile size={16} />}
            nodeType="emoji"
        >
            <div className="emoji-node__display">
                <span className="emoji-node__emoji">{emoji}</span>
            </div>
            <div className="base-node__field">
                <label className="base-node__label">Choose Emoji</label>
                <CustomSelect
                    options={emojiOptions}
                    value={emoji}
                    onChange={handleEmojiChange}
                    focusColor="#FBBF24"
                />
            </div>
        </BaseNode>
    );
};
