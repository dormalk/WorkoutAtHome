import React from 'react';


export const ToggleBar = ({children,title,id='none'}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return(
        <React.Fragment>
            <h4 className="category">{title} <span onClick={() => setIsOpen(!isOpen)}>{isOpen? '-': '+'}</span></h4>
            <ul id={id} className="sidebar-block list-group list-group-menu list-group-minimal" >
                {isOpen && children}
            </ul>
        </React.Fragment>
    )
}