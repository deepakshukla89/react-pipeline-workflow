// inputNode.js
// Refactored to use custom hooks and common components

import { Download } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/common/CustomSelect';
import { useNodeField } from '../hooks/useNodeField';

const typeOptions = [
  { value: 'Text', label: 'Text' },
  { value: 'File', label: 'File' }
];

export const InputNode = ({ id, data }) => {
  const [currName, handleNameChange] = useNodeField(
    id,
    'inputName',
    data?.inputName || id.replace('customInput-', 'input_')
  );

  const [inputType, handleTypeChange] = useNodeField(
    id,
    'inputType',
    data?.inputType || 'Text'
  );

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
          onChange={(e) => handleNameChange(e.target.value)}
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
