import React from 'react';

export default ({onSendPraise,handleMouseMove}) => {



    function startDrag(){
        console.log("drag");
        document.getElementById('cover').css('display','block')
        document.addEventListener('mousemove',handleMove)
    }

    function onDrop(){
        document.removeEventListener('mousemove',handleMove)
        document.getElementById('cover').css('display','none')
        console.log("drop");
    }


    function handleMove(){
        const {pageX,pageY} = handleMouseMove()
        console.log(pageX,pageY)
    }
    return(
    <nav    onMouseDown={() => startDrag()}
            onMouseUp={() => onDrop()}>

        <div id="participents-list">

        </div>
        <button id="parise-button" onClick={() => onSendPraise()}>
            <img src="./assets/images/cheerleader.svg" alt="cheer"/>
            <span>Cheer Ups!</span>
        </button>  
    </nav>

    )
}