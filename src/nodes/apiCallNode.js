// apiCallNode.js
// Refactored to use custom hooks and common components

import { Plug } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/common/CustomSelect';
import { useNodeField } from '../hooks/useNodeField';

const methodOptions = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
    { value: 'PATCH', label: 'PATCH' }
];

export const APICallNode = ({ id, data }) => {
    const [url, handleUrlChange] = useNodeField(id, 'url', data?.url || 'https://api.example.com');
    const [method, handleMethodChange] = useNodeField(id, 'method', data?.method || 'GET');

    return (
        <BaseNode
            id={id}
            title="API Call"
            icon={<Plug size={16} />}
            nodeType="api"
            inputs={[
                { id: 'body', position: 33 },
                { id: 'headers', position: 66 }
            ]}
            outputs={[{ id: 'response' }]}
        >
            <div className="base-node__field">
                <label className="base-node__label">URL</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="base-node__input"
                    placeholder="https://api.example.com"
                />
            </div>
            <div className="base-node__field">
                <label className="base-node__label">Method</label>
                <CustomSelect
                    options={methodOptions}
                    value={method}
                    onChange={handleMethodChange}
                    focusColor="#06B6D4"
                />
            </div>
        </BaseNode>
    );
};
