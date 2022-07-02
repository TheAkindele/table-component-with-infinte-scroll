import React from 'react'

interface ICheckbox {
    value: boolean
    onChange: () => void
}

export const Checkbox = ({value, onChange}: ICheckbox) => {
    
    return (
      <input 
        name="table-checkbox" 
        type="checkbox" 
        checked={value} 
        onChange={onChange} 
        data-testid="checkbox" 
        className='checkbox'
        style={{cursor: "pointer"}}
      />
    );
};
