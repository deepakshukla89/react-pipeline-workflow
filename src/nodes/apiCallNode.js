// apiCallNode.js
// With store sync for payload

import { useState, useCallback } from 'react';
import { Plug } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { useStore } from '../store';

const methodOptions = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
    { value: 'PATCH', label: 'PATCH' }
];

export const APICallNode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || 'https://api.example.com');
    const [method, setMethod] = useState(data?.method || 'GET');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleUrlChange = useCallback((e) => {
        const value = e.target.value;
        setUrl(value);
        updateNodeField(id, 'url', value);
    }, [id, updateNodeField]);

    const handleMethodChange = useCallback((value) => {
        setMethod(value);
        updateNodeField(id, 'method', value);
    }, [id, updateNodeField]);

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
                    onChange={handleUrlChange}
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
