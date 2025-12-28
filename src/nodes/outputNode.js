// outputNode.js
// With store sync for payload

import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { useStore } from '../store';

const typeOptions = [
  { value: 'Text', label: 'Text' },
  { value: 'Image', label: 'Image' }
];

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = useCallback((e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'outputName', value);
  }, [id, updateNodeField]);

  const handleTypeChange = useCallback((value) => {
    setOutputType(value);
    updateNodeField(id, 'outputType', value);
  }, [id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={<Upload size={16} />}
      nodeType="output"
      inputs={[{ id: 'value' }]}
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
          value={outputType}
          onChange={handleTypeChange}
          focusColor="#EF4444"
        />
      </div>
    </BaseNode>
  );
};
