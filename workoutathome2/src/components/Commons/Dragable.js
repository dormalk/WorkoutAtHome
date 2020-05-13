import React from 'react';

function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    return event;
    // Use event.pageX / event.pageY here
}


export default ({children,id, initialPos}) => {
    const [isDrag, setIsDrag] = React.useState(false); 
    const [pos,setPos] = React.useState(JSON.parse(localStorage.getItem(id)) || {pageX:initialPos.pageX,pageY:initialPos.pageY})

    const handleMove = (event) => {
        if(isDrag){
            const {pageX,pageY} = handleMouseMove(event)
            setPos({pageX:pageX-90,pageY:pageY-50})
            localStorage.setItem(id,JSON.stringify(pos))
            console.log(pageX,pageY)
        }
    }



    return(
        <div    onMouseDown={() => setIsDrag(true)}
                onMouseUp={() => setIsDrag(false)}
                onMouseMove={(event) => handleMove(event)}
                style={{position: "absolute", top: pos.pageY, left: pos.pageX, cursor: isDrag? 'grab':'context-menu'}}>
                    {children}            
        </div>
    )
}