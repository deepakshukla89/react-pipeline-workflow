// draggableNode.js
// Draggable node component for toolbar with Lucide icons

import {
  Download, Upload, Bot, FileText,
  Languages, Image, StickyNote, Plug, Filter
} from 'lucide-react';

// Icon mapping for each node type
const iconMap = {
  customInput: Download,
  customOutput: Upload,
  llm: Bot,
  text: FileText,
  translation: Languages,
  imageGen: Image,
  note: StickyNote,
  apiCall: Plug,
  filter: Filter,
};

export const DraggableNode = ({ type, label }) => {
  const IconComponent = iconMap[type];

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node draggable-node--${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {IconComponent && (
        <span className="draggable-node__icon">
          <IconComponent size={16} />
        </span>
      )}
      <span className="draggable-node__label">{label}</span>
    </div>
  );
};