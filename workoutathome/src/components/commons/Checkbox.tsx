import React from 'react';


interface Props{
    label: string,
    onChange: Function,
    checked: boolean
}

export const Checkbox = (props:Props) => {
    return(
        <div className={`checkbox`} onClick={() => props.onChange(!props.checked)}>
            <i className={props.checked? 'active': ''}></i> {props.label}
        </div>
    )
}