import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    return (
        <div className="input-block">
            <input type="text" id={name} {...rest} placeholder={label} />
            {/* <FaSearch color="white" size={30} className="iconSearch" /> */}

        </div>
    )
}

export default Input;