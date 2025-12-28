// inputNode.js
// With store sync for payload

import { useState, useCallback } from 'react';
import { Download } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { useStore } from '../store';

const typeOptions = [
  { value: 'Text', label: 'Text' },
  { value: 'File', label: 'File' }
];

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = useCallback((e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'inputName', value);
  }, [id, updateNodeField]);

  const handleTypeChange = useCallback((value) => {
    setInputType(value);
    updateNodeField(id, 'inputType', value);
  }, [id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={<Download size={16} />}
      nodeType="input"
      outputs={[{ id: 'value' }]}
    >
      <div className="base-node__field">
        <label className="base-node__label">Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="base-node__input"
        />
      </div>
      <div className="base-node__field">
        <label className="base-node__label">Type</label>
        <CustomSelect
          options={typeOptions}
          value={inputType}
          onChange={handleTypeChange}
          focusColor="#10B981"
        />
      </div>
    </BaseNode>
  );
};
