'use client';

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    validate?: (value: any) => boolean | string;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    validate,
    errors
}) => {
    const error = errors && errors[id];

    return (
        <div className=" w-full relative">
            <input 
                id={id} 
                disabled={disabled} 
                required={required}
                {...register(id, { required, validate })} 
                placeholder=" "
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
                    pl-9
                    border-neutral-300
                    focus:border-black
                    ${errors[id] ? 'border-rose-500':'border-neutral-300'}
                    ${errors[id] ? ' focus:border-rose-500':'focus:border-black'}`}
            />
            {error && <p className="text-rose-500">{error.message as string}</p>}
            <label className={`absolute duration-150 -translate-y-3 top-5 z-10 origin-[0]
                left-4
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                text-neutral-400
                ${errors[id] ? 'text-rose-500' : 'text-neutral-400'}`}>
                {label}
            </label>
        </div>
    )
}

export default Input;