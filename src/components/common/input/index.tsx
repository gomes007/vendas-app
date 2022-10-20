import React, {InputHTMLAttributes} from "react";
import {formatReal} from 'app/util/money';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (value: any) => void;
    label: string;
    columnClasses?: string;
    id: string;
    currency?: boolean;
    error?: string;
}


export const Input = ({onChange, label, columnClasses, id, currency, error, ...inputProps}: InputProps) => {

    const onInputChange = (event: { target: { value: any; }; }) => {
        let value = event.target.value;

        if(value && currency){
            value = formatReal(value);
        }

        if(onChange){
            onChange(value)
        }
    }

    return (
        <div className={`field column ${columnClasses}`}>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="control">
                <input className="input"
                       id={id}
                       {...inputProps}
                       onChange={onInputChange}
                />
                {error &&
                    <p className="help is-danger">{error}</p>
                }
            </div>
        </div>
    )
}
