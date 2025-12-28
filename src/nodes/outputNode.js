// outputNode.js
// Refactored to use custom hooks and common components

import { Upload } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/common/CustomSelect';
import { useNodeField } from '../hooks/useNodeField';

const typeOptions = [
  { value: 'Text', label: 'Text' },
  { value: 'Image', label: 'Image' }
];

export const OutputNode = ({ id, data }) => {
  const [currName, handleNameChange] = useNodeField(
    id,
    'outputName',
    data?.outputName || id.replace('customOutput-', 'output_')
  );

  const [outputType, handleTypeChange] = useNodeField(
    id,
    'outputType',
    data?.outputType || 'Text'
  );

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
          onChange={(e) => handleNameChange(e.target.value)}
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
