/* eslint-disable eqeqeq */
import React from 'react';



export default ({id}) => {
    const [scale1, setScale] = React.useState(1)

    return(
    <nav id="participent-list-container" style={{transform: `scale(${scale1})`}}>
        <button onClick={() => {
            if(scale1 == 1.5) setScale(0.5)
            else setScale(scale1+0.5)
        }}><i className={scale1 == 1.5? "fa fa-fw icon-collapse": "fa fa-fw icon-expand"}></i></button>
        <div id={`participents-list_${id}`}>
        </div>
    </nav>

    )
}