/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
export default (props) => {
    const [micMuted, setMicMuted] = React.useState(false);
    const [vidMuted, setVidMuted] = React.useState(false);
    
    React.useEffect(() => {
      }, []);



    function toggelMic(){
        setMicMuted(!micMuted);
        props.toggelStreamConnection(!micMuted,'audio');
    }
    function toggelVideo(){
        setVidMuted(!vidMuted);
        props.toggelStreamConnection(!vidMuted,'video');
    }

    function copyUrl() {
        /* Get the text field */
        var dummy = document.createElement('input'),
        text = window.location.href;
        var general_pop = document.getElementById('global-message');
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        general_pop.classList.add('show');
        general_pop.innerText = 'The link copied to clipboard';
        setTimeout(function() {
            general_pop.classList.remove('show')
        },2000)
      }

    //   function shareFacebook() {
    //     var text = window.location.href;
    //     var url = 'https://www.facebook.com/sharer/sharer.php?u='+text;
    //     var win = window.open(url, '_blank');
    //     win.focus();
    //   }
        

    return(
        <nav id="btns">
                <ul className="nav navbar-nav" style={{marginRight: "0px", cursor: 'pointer',width: '50%'}}>
                    <a className="navbar-brand" style={{padding: '5px 10px', height: '100%'}} href="/"><img style={{height: "100%"}} src="./assets/images/logo.png" alt="logo"/></a>
                </ul>
                <div style={{width: "50%"}}>
                <button id="audio-button" className={`stream-control ${micMuted? 'muted' : ''}`} onClick={() => toggelMic()}>
                    <i className="fa fa-microphone"></i>
                </button>
                <button id="video-button" className={`stream-control ${vidMuted? 'muted' : ''}`} onClick={() => toggelVideo()}>
                    <i className="fa  fa-video-camera"></i>
                </button>
                <ul className="nav navbar-nav navbar-right" style={{marginRight: "0px", cursor: 'pointer',float:'right', height: '100%'}}>
                    <li className="dropdown user">
                        <a className="dropdown-toggle" data-toggle="dropdown" >
                        <span className="caret"></span> Invite friends 
                        </a>
                        <ul className="dropdown-menu" role="menu">
                            <li  onClick={() => copyUrl()}><a><i className="fa fa-copy"></i>Copy Link</a></li>
                            {/* <li onClick={() => shareFacebook()}><a><i className="fa fa-facebook-f"></i>Facebook</a></li> */}
                            {/* <li><a href={`whatsapp://send?text=Join to my workout now! Link: ${window.location.href}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp"></i>Whatsapp</a></li> */}
                        </ul>
                    </li>

                </ul>
                <div style={{clear: 'both'}}></div>
            </div>
        </nav>
    )
}


// <button id="share-facebook" className="sharebutton">
// <span>Share on </span><i className="fab fa-facebook-f"></i>
// </button>
// <button id="copyBtn" className="sharebutton" onclick="copyUrl()">
// <span>Get link </span> <i className="far fa-copy"></i>
// </button>