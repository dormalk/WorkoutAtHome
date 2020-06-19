import React from 'react';

function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event.touches? event.touches[0]  : event || window.event; // IE-ism
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          // eslint-disable-next-line no-mixed-operators
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          // eslint-disable-next-line no-mixed-operators
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          // eslint-disable-next-line no-mixed-operators
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          // eslint-disable-next-line no-mixed-operators
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    return {
        pageX: event.clientX, pageY: event.clientY

    };
    // Use event.pageX / event.pageY here
}




export default ({children,id, initialPos}) => {
    const [isDrag, setIsDrag] = React.useState(false); 
    const [pos,setPos] = React.useState(JSON.parse(localStorage.getItem(id)) || {pageX:calcPosY(initialPos.pageX),pageY:calcPosY(initialPos.pageY)})
    const [prevPage,setPrevPage] = React.useState({prevPageX:null,prevPageY:null})
    //  || 

    const handleMove = (event) => {
        var elem = document.getElementById(id);
        if(isDrag){
            const {pageX,pageY} = handleMouseMove(event)
            var {prevPageX,prevPageY} = prevPage;
            if(prevPageX == null)  prevPageX = pageX
            if(prevPageY == null)  prevPageY = pageY
            setPos({pageX:elem.offsetLeft + pageX - (prevPageX) ,pageY: elem.offsetTop + pageY - prevPageY})
            localStorage.setItem(id,JSON.stringify(pos))
            setPrevPage({prevPageX: pageX,prevPageY: pageY})
        }
    }


    function calcPosX(pos){
        console.log(window.innerWidth)
        if(pos < 0) return 0
        else if(pos > (window.innerWidth-100)) return window.innerWidth - 100;
        else return pos;
    }


    function calcPosY(pos){
        if(pos < 0) return 0
        else if(pos > (window.innerHeight-100)) return window.innerHeight - 100;
        else return pos;
    }


    return(
        <React.Fragment>
            <div    onMouseDown={() => setIsDrag(true)}
                    onMouseUp={() => {
                        setIsDrag(false)
                        setPrevPage({prevPageX: null,prevPageY: null})
                    }}
                    onTouchStart={() => setIsDrag(true)}
                    onTouchEnd={() => {
                        setIsDrag(false)
                        setPrevPage({prevPageX: null,prevPageY: null})
                    }}
                    onTouchMove={(event) => handleMove(event)}
                    onMouseMove={(event) => handleMove(event)}
                    onMouseLeave={() => {
                        setIsDrag(false)
                        setPrevPage({prevPageX: null,prevPageY: null})

                    }}
                    id={id || ''}
                    style={{position: "absolute", top: calcPosY(pos.pageY), left: calcPosX(pos.pageX), cursor: isDrag? 'grab':'context-menu'}}>
                        {children}            
            </div>
        </React.Fragment>
    )
}

