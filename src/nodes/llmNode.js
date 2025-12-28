// llmNode.js
// Refactored to use BaseNode abstraction with Lucide icons

import { Bot } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={<Bot size={16} />}
      nodeType="llm"
      inputs={[
        { id: 'system', position: 33 },
        { id: 'prompt', position: 66 }
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className="base-node__field">
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
          Large Language Model node for AI processing.
        </span>
      </div>
    </BaseNode>
  );
};
