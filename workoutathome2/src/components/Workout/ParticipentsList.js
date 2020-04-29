import React from 'react';

export default ({onSendPraise}) => {

    function toggleNav(){
        var nav = document.querySelector('nav');
        if(nav.style.width === '50vw'){
          nav.style.width = '250px';
          nav.classList.remove('open');
          nav.classList.add('close_2');
        } else {
          nav.style.width = '50vw'
          nav.classList.add('open');
          nav.classList.remove('close_2');
        }
    }


    return(
    <nav className="open">
        <button id="toggle-nav" onClick={() => toggleNav()}>
            <i className="fa fa-arrow-left"></i>
        </button>
        <div id="participents-list">

        </div>
        <button id="parise-button" onClick={() => onSendPraise()}>
            <img src="./assets/images/cheerleader.svg" alt="cheer"/>
            <span>Cheer Ups!</span>
        </button>  
    </nav>

    )
}