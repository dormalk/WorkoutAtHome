import React from 'react';

interface Props {
    children: JSX.Element | null;
    onClose: Function;
    title: string;
}


export const LightBox = (props: Props) => {
    return(
        <div className="light-box_container">
            <div className="light-box">
                <button className="light-box_close" onClick={() => props.onClose()}><i className="fas fa-times"></i></button>
                <div className="light-box_header">
                    <h3>{props.title}</h3>
                </div>
                <div className="light-box_body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}