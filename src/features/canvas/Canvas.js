// ui.js
// Fullscreen React Flow canvas with Smart Guides

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap, ReactFlowProvider } from 'reactflow';
import { useStore } from '../../store/useStore';
import { shallow } from 'zustand/shallow';
import { HelperLinesRenderer } from './HelperLinesRenderer';

// Original Nodes
import { InputNode } from '../../nodes/inputNode';
import { LLMNode } from '../../nodes/llmNode';
import { OutputNode } from '../../nodes/outputNode';
import { TextNode } from '../../nodes/textNode';

// New Nodes
import { TranslationNode } from '../../nodes/translationNode';
import { ImageGenNode } from '../../nodes/imageGenNode';
import { EmojiNode } from '../../nodes/emojiNode';
import { APICallNode } from '../../nodes/apiCallNode';
import { FilterNode } from '../../nodes/filterNode';
import { NoteNode } from '../../nodes/noteNode';

import 'reactflow/dist/style.css';

import { GRID_SIZE } from '../../config/constants';
const proOptions = { hideAttribution: true };

// Register all node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  translation: TranslationNode,
  imageGen: ImageGenNode,
  emoji: EmojiNode,
  apiCall: APICallNode,
  filter: FilterNode,
  note: NoteNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  showMinimap: state.showMinimap,
});

// Flow Canvas Component
const FlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isPanning, setIsPanning] = useState(false);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    showMinimap,
  } = useStore(selector, shallow);

  // Space key for panning mode (like Figma)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if typing in input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setIsPanning(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsPanning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: type };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      className={`pipeline-canvas ${isPanning ? 'panning-mode' : ''}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        connectionLineType='smoothstep'
        panOnDrag={isPanning}
        selectionOnDrag={!isPanning}
        panOnScroll={true}
        zoomOnScroll={true}
        selectNodesOnDrag={false}
        deleteKeyCode={['Backspace', 'Delete']}
        fitView
      >
        <Background
          variant="lines"
          gap={40}
          color="rgba(203, 213, 225, 0.25)"
          lineWidth={0.3}
        />
        <Controls
          showInteractive={false}
          position="bottom-left"
        />
        {showMinimap && (
          <MiniMap
            nodeColor="#6366F1"
            maskColor="rgba(248, 250, 252, 0.8)"
            position="top-right"
          />
        )}
        <HelperLinesRenderer />
      </ReactFlow>
    </div>
  );
};

// Wrapper with Provider
export const PipelineUI = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
};
