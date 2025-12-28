// translationNode.js
// With store sync for payload

import { useState, useCallback } from 'react';
import { Languages } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { useStore } from '../store';

const languageOptions = [
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Hindi', label: 'Hindi' }
];

export const TranslationNode = ({ id, data }) => {
    const [targetLanguage, setTargetLanguage] = useState(data?.language || 'Spanish');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleLanguageChange = useCallback((value) => {
        setTargetLanguage(value);
        updateNodeField(id, 'language', value);
    }, [id, updateNodeField]);

    return (
        <BaseNode
            id={id}
            title="Translation"
            icon={<Languages size={16} />}
            nodeType="translation"
            inputs={[{ id: 'text' }]}
            outputs={[{ id: 'translated' }]}
        >
            <div className="base-node__field">
                <label className="base-node__label">Target Language</label>
                <CustomSelect
                    options={languageOptions}
                    value={targetLanguage}
                    onChange={handleLanguageChange}
                    focusColor="#F59E0B"
                />
            </div>
        </BaseNode>
    );
};
