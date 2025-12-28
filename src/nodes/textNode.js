// textNode.js
// Enhanced with dynamic variable detection and store sync

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { FileText } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

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
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variables whenever text changes
  useEffect(() => {
    const newVars = extractVariables(currText);
    setVariables(newVars);
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

  const handleTextChange = useCallback((e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
  }, [id, updateNodeField]);

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
          onChange={handleTextChange}
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
