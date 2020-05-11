import React from 'react';

export const Page = (props) => {
    return(
    <div className="st-pusher">
        <div className="st-content">
            <div className="st-content-inner">
                <div className="container-fluid">
                {props.children}
                </div>
            </div>
        </div>
    </div>
    )
}
