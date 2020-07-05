import React from 'react';


interface Props{
    options: string[],
    vertical?: boolean,
    onChange: Function,
    value: string
}

export const OptionsBox = (props:Props) => {
    return(
        <div className={`options-box`}>
            {
                props.options.map(option => (
                    <div className="option">
                        <i className={option === props.value? 'active': ''}></i> {option} {props.vertical? (<br/>):(null)}
                    </div>
                ))
            }
        </div>
    )
}