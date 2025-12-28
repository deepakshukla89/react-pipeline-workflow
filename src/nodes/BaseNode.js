// BaseNode.js
// Reusable base node component with consistent styling

import { Handle, Position } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({
    id,
    title,
    icon,
    nodeType,
    inputs = [],
    outputs = [],
    children,
    customHandles = false,
    style = {}
}) => {
    return (
        <div className={`base-node base-node--${nodeType}`} style={style}>
            <div className="base-node__header">
                <span className="base-node__icon">{icon}</span>
                <span className="base-node__title">{title}</span>
            </div>

            <div className="base-node__content">
                {children}
            </div>

            {/* Input Handles */}
            {!customHandles && inputs.map((input, index) => (
                <Handle
                    key={input.id}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${input.id}`}
                    className="base-node__handle base-node__handle--input"
                    style={{ top: input.position ? `${input.position}%` : '50%' }}
                />
            ))}

            {/* Output Handles */}
            {!customHandles && outputs.map((output, index) => (
                <Handle
                    key={output.id}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${output.id}`}
                    className="base-node__handle base-node__handle--output"
                    style={{ top: output.position ? `${output.position}%` : '50%' }}
                />
            ))}
        </div>
    );
};
