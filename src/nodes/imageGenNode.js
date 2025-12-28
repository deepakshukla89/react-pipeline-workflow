// imageGenNode.js
// Refactored to use custom hooks and common components

import { Image } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { CustomSelect } from '../components/common/CustomSelect';
import { useNodeField } from '../hooks/useNodeField';

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
    const [model, handleModelChange] = useNodeField(id, 'model', data?.model || 'DALL-E 3');
    const [size, handleSizeChange] = useNodeField(id, 'size', data?.size || '1024x1024');

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
