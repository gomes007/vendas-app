import React, {InputHTMLAttributes} from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    onChange?: (value: any) => void;
    label: string;
    columnClasses?: string;
    id:string;
}


export const Input = ({onChange, label, columnClasses, id, ...inputProps}: InputProps) => {
    return (
        <div className={`field column ${columnClasses}`}>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="control">
                <input className="input"
                       id={id}
                       {...inputProps}
                       onChange={event => {if(onChange){onChange(event.target.value)}}}
                />
            </div>
        </div>
    )
}
