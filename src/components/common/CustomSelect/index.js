// CustomSelect.js
// Reusable custom styled dropdown - fixed hover/active states

import Select from 'react-select';

// Function to create custom styles with dynamic focus color
const getCustomStyles = (focusColor) => ({
    control: (base, state) => ({
        ...base,
        background: '#F1F5F9',
        borderColor: state.isFocused ? focusColor : '#E2E8F0',
        borderRadius: '6px',
        minHeight: '32px',
        fontSize: '13px',
        fontFamily: 'inherit',
        boxShadow: 'none',
        cursor: 'pointer',
        '&:hover': {
            borderColor: state.isFocused ? focusColor : '#E2E8F0'
        }
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '2px 10px'
    }),
    singleValue: (base) => ({
        ...base,
        color: '#1E293B',
        fontSize: '13px',
        fontFamily: 'inherit'
    }),
    placeholder: (base) => ({
        ...base,
        color: '#94A3B8',
        fontSize: '13px',
        fontFamily: 'inherit'
    }),
    input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
        fontSize: '13px',
        fontFamily: 'inherit'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: '4px 6px',
        color: '#94A3B8'
    }),
    menu: (base) => ({
        ...base,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '6px',
        marginTop: '2px',
        overflow: 'hidden',
        zIndex: 10
    }),
    menuList: (base) => ({
        ...base,
        padding: '4px',
        maxHeight: 'none',
        overflow: 'visible'
    }),
    option: (base, state) => ({
        ...base,
        background: state.isSelected
            ? focusColor
            : state.isFocused
                ? '#F1F5F9'
                : 'transparent',
        color: state.isSelected ? '#FFFFFF' : '#1E293B',
        fontSize: '11px',
        fontFamily: 'inherit',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        lineHeight: '1.3',
        '&:active': {
            background: state.isSelected ? focusColor : '#F1F5F9'
        }
    })
});

export const CustomSelect = ({ options, value, onChange, placeholder = 'Select...', focusColor = '#6366F1' }) => {
    const selectedOption = options.find(opt => opt.value === value);

    const handleChange = (selected) => {
        onChange(selected ? selected.value : '');
    };

    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={handleClick}
            onMouseDown={handleClick}
            className="nodrag"
        >
            <Select
                styles={getCustomStyles(focusColor)}
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder={placeholder}
                isSearchable={false}
                menuPlacement="auto"
                classNamePrefix="custom-select"
            />
        </div>
    );
};

export default CustomSelect;
