import React from 'react';

const CustomTextArea = ({description, handleOnChange, label, name, row, placeholder}) => {
    return (
        <div>
            {/*Enter workspace description*/}
            <label htmlFor="description">{label}</label>
            <textarea className="description" name={name} rows={row ? row : "2"}
                      placeholder={placeholder}
                      value={description}
                      onChange={e => {handleOnChange(e)}}
            />
        </div>
    );
};

export default CustomTextArea;