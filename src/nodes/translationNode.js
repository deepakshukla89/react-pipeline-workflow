// translationNode.js
// Refactored to use custom hooks and common components

import { Languages } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/common/CustomSelect';
import { useNodeField } from '../hooks/useNodeField';

const languageOptions = [
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Hindi', label: 'Hindi' }
];

export const TranslationNode = ({ id, data }) => {
    const [targetLanguage, handleLanguageChange] = useNodeField(id, 'language', data?.language || 'Spanish');

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
