import React from 'react'

interface ICheckbox {
    value: boolean
    onChange: () => void
}

export const Checkbox = ({ value, onChange }: ICheckbox) => {
    
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {/* {label} */}
      </label>
    );
};
