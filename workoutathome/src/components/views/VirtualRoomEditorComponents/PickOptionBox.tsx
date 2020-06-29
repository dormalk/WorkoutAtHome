import React from 'react';

interface Props{
    title: string;
    subtitle: string;
    onClick: Function;
}

export const PickOptionBox = (props: Props) => {
    return(
        <div className="pickOptionBox" onClick={() => props.onClick()}>
            <h2>{props.title}</h2>
            <p>{props.subtitle}</p>
        </div>
    )
}

