// src/hooks/useNodeField.js
// Custom hook to eliminate duplicate field update logic in nodes

import { useState, useCallback } from 'react';
import { useStore } from '../store';

/**
 * Custom hook for managing node field state with store sync.
 * Eliminates the repetitive pattern found in every node component.
 * 
 * @param {string} nodeId - The node ID
 * @param {string} fieldName - The field name to update
 * @param {any} initialValue - Initial value for the field
 * @returns {[any, Function]} - [value, handleChange]
 * 
 * @example
 * // Before (in every node):
 * const [currName, setCurrName] = useState(data?.name || 'default');
 * const updateNodeField = useStore((state) => state.updateNodeField);
 * const handleNameChange = useCallback((e) => {
 *     const value = e.target.value;
 *     setCurrName(value);
 *     updateNodeField(id, 'name', value);
 * }, [id, updateNodeField]);
 * 
 * // After (using this hook):
 * const [currName, handleNameChange] = useNodeField(id, 'name', data?.name || 'default');
 */
export const useNodeField = (nodeId, fieldName, initialValue) => {
    const [value, setValue] = useState(initialValue);
    const updateNodeField = useStore((state) => state.updateNodeField);

    // For input/textarea onChange events (receives event)
    const handleInputChange = useCallback((e) => {
        const newValue = e.target.value;
        setValue(newValue);
        updateNodeField(nodeId, fieldName, newValue);
    }, [nodeId, fieldName, updateNodeField]);

    return [value, handleInputChange];
};

/**
 * Custom hook for managing node field with direct value (no event).
 * Useful for CustomSelect and other controlled components.
 * 
 * @param {string} nodeId - The node ID
 * @param {string} fieldName - The field name to update
 * @param {any} initialValue - Initial value for the field
 * @returns {[any, Function]} - [value, handleChange]
 * 
 * @example
 * const [inputType, handleTypeChange] = useNodeFieldValue(id, 'inputType', data?.inputType || 'Text');
 * <CustomSelect value={inputType} onChange={handleTypeChange} />
 */
export const useNodeFieldValue = (nodeId, fieldName, initialValue) => {
    const [value, setValue] = useState(initialValue);
    const updateNodeField = useStore((state) => state.updateNodeField);

    // For direct value updates (receives value directly)
    const handleChange = useCallback((newValue) => {
        setValue(newValue);
        updateNodeField(nodeId, fieldName, newValue);
    }, [nodeId, fieldName, updateNodeField]);

    return [value, handleChange];
};

export default useNodeField;
