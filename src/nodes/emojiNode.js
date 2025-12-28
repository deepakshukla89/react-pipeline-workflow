// emojiNode.js
// Refactored to use custom hooks and common components

import { Smile } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/common/CustomSelect';
import { useNodeField } from '../hooks/useNodeField';

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
    const [emoji, handleEmojiChange] = useNodeField(id, 'emoji', data?.emoji || '⭐');

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
