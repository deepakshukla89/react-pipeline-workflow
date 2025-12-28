// imageGenNode.js
// With store sync for payload

import { useState, useCallback } from 'react';
import { Image } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { useStore } from '../store';

const modelOptions = [
    { value: 'DALL-E 3', label: 'DALL-E 3' },
    { value: 'Stable Diffusion', label: 'Stable Diffusion' },
    { value: 'Midjourney', label: 'Midjourney' }
];

const sizeOptions = [
    { value: '512x512', label: '512x512' },
    { value: '1024x1024', label: '1024x1024' },
    { value: '1920x1080', label: '1920x1080' }
];

export const ImageGenNode = ({ id, data }) => {
    const [model, setModel] = useState(data?.model || 'DALL-E 3');
    const [size, setSize] = useState(data?.size || '1024x1024');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleModelChange = useCallback((value) => {
        setModel(value);
        updateNodeField(id, 'model', value);
    }, [id, updateNodeField]);

    const handleSizeChange = useCallback((value) => {
        setSize(value);
        updateNodeField(id, 'size', value);
    }, [id, updateNodeField]);

    return (
        <BaseNode
            id={id}
            title="Image Generation"
            icon={<Image size={16} />}
            nodeType="imagegen"
            inputs={[{ id: 'prompt' }]}
            outputs={[{ id: 'image' }]}
        >
            <div className="base-node__field">
                <label className="base-node__label">Model</label>
                <CustomSelect
                    options={modelOptions}
                    value={model}
                    onChange={handleModelChange}
                    focusColor="#EC4899"
                />
            </div>
            <div className="base-node__field">
                <label className="base-node__label">Size</label>
                <CustomSelect
                    options={sizeOptions}
                    value={size}
                    onChange={handleSizeChange}
                    focusColor="#EC4899"
                />
            </div>
        </BaseNode>
    );
};
