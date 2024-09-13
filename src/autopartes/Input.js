import React from 'react';


function Input({ className, type, id, name, ...rest }) {
    return (
        <input
            className={className}
            type={type}
            id={id}
            name={name}
            {...rest}
        // value={inputs.input1}
        // onChange={handleInputChange}
        // disabled={!isInputEnabled.input1}
        />
    )
}

export default Input