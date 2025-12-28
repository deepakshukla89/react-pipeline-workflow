// filterNode.js
// Refactored to use custom hooks and common components

import { Filter } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/common/CustomSelect';
import { useNodeField } from '../hooks/useNodeField';

const conditionOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater', label: 'Greater Than' },
    { value: 'less', label: 'Less Than' },
    { value: 'regex', label: 'Regex Match' }
];

export const FilterNode = ({ id, data }) => {
    const [condition, handleConditionChange] = useNodeField(id, 'condition', data?.condition || 'equals');
    const [value, handleValueChange] = useNodeField(id, 'value', data?.value || '');

    return (
        <BaseNode
            id={id}
            title="Filter"
            icon={<Filter size={16} />}
            nodeType="filter"
            inputs={[{ id: 'data' }]}
            outputs={[
                { id: 'matched', position: 33 },
                { id: 'unmatched', position: 66 }
            ]}
        >
            <div className="base-node__field">
                <label className="base-node__label">Condition</label>
                <CustomSelect
                    options={conditionOptions}
                    value={condition}
                    onChange={handleConditionChange}
                    focusColor="#14B8A6"
                />
            </div>
            <div className="base-node__field">
                <label className="base-node__label">Value</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    className="base-node__input"
                    placeholder="Filter value..."
                />
            </div>
        </BaseNode>
    );
};
