// filterNode.js
// With store sync for payload

import { useState, useCallback } from 'react';
import { Filter } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { useStore } from '../store';

const conditionOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater', label: 'Greater Than' },
    { value: 'less', label: 'Less Than' },
    { value: 'regex', label: 'Regex Match' }
];

export const FilterNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || 'equals');
    const [value, setValue] = useState(data?.value || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleConditionChange = useCallback((val) => {
        setCondition(val);
        updateNodeField(id, 'condition', val);
    }, [id, updateNodeField]);

    const handleValueChange = useCallback((e) => {
        const val = e.target.value;
        setValue(val);
        updateNodeField(id, 'value', val);
    }, [id, updateNodeField]);

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
                    onChange={handleValueChange}
                    className="base-node__input"
                    placeholder="Filter value..."
                />
            </div>
        </BaseNode>
    );
};
