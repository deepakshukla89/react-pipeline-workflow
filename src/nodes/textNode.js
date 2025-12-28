// textNode.js
// Enhanced with dynamic variable detection and store sync

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { FileText } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useNodeField } from '../hooks/useNodeField';

// Regex to extract valid JavaScript variable names from {{ variableName }} patterns
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
};

export const TextNode = ({ id, data }) => {
  // Use hook for text syncing
  const [currText, handleTextChange] = useNodeField(id, 'text', data?.text || '{{input}}');

  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Extract variables whenever text changes
  useEffect(() => {
    const newVars = extractVariables(currText);
    setVariables(newVars);
    // Note: We might want to sync variables to store too if needed specifically?
    // But text update is enough for saving string.
  }, [currText]);

  // CRITICAL: Update node internals when handles change
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  // Auto-resize textarea based on content
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Calculate dynamic height for node based on variables count
  const minNodeHeight = Math.max(100, variables.length * 25 + 80);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={<FileText size={16} />}
      nodeType="text"
      customHandles={true}
      style={{ minHeight: `${minNodeHeight}px` }}
    >
      <div className="base-node__field">
        <label className="base-node__label">Text</label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="base-node__textarea"
          placeholder="Enter text with {{ variables }}"
          style={{ minHeight: '60px' }}
        />
      </div>

      {/* Dynamic Input Handles for each detected variable */}
      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          className="base-node__handle base-node__handle--input"
          style={{
            top: `${55 + (index * 25)}px`,
          }}
        />
      ))}

      {/* Static Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="base-node__handle base-node__handle--output"
        style={{ top: '50%' }}
      />
    </BaseNode>
  );
};
