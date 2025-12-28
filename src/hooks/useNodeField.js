import { useCallback, useState } from 'react';
import { useStore } from '../store/useStore';

export const useNodeField = (id, fieldName, initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleChange = useCallback((newValue) => {
        setValue(newValue);
        updateNodeField(id, fieldName, newValue);
    }, [id, fieldName, updateNodeField]);

    return [value, handleChange, setValue];
};
