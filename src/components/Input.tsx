'use client';

import React from "react";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    required,
}) => {
    return (
        <div className=" w-full relative">
            <input 
                id={id} 
                disabled={disabled} 
                required={required}
                placeholder=" "
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
                    pl-9
                    border-neutral-300
                    focus:border-black`}
            />
            <label className={`absolute duration-150 -translate-y-3 top-5 z-10 origin-[0]
                left-4
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                text-neutral-400`}>
                {label}
            </label>
        </div>
    )
}

export default Input;