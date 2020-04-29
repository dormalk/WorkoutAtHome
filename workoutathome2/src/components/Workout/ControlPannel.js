/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default (props) => {
    const [audio] = React.useState(new Audio('./assets/music/WorkoutMix2019FitnessGymMotivation.mp3'))
    const [isMute, setIsMute] = React.useState(true);
    const [micMuted, setMicMuted] = React.useState(false);
    const [vidMuted, setVidMuted] = React.useState(false);
    
    React.useEffect(() => {
        toggelAudio();
      }, []);

    const toggelAudio = () =>{
        if(!audio.paused){
            setIsMute(true);
            audio.pause();
        } else {
            setIsMute(false);
            audio.play()
        }

    }

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
        console.log('hhhh');
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

      function shareFacebook() {
        var text = window.location.href;
        var url = 'https://www.facebook.com/sharer/sharer.php?u='+text;
        var win = window.open(url, '_blank');
        win.focus();
      }
        

    return(
        <div id="btns">
            <div id="audiobutton"  className={`${isMute? 'mute': 'audio1'}`}>
                <button onClick={() => toggelAudio()} className={`innerbutton ${isMute? '': 'audio2'}`}>
                    <i className={`fa fa-volume-${isMute? 'off':'up'}`}></i>
                    
                </button>
            </div>
            <div style={{width: "50%"}}>
                <button id="audio-button" className={`stream-control ${micMuted? 'muted' : ''}`} onClick={() => toggelMic()}>
                    <i className="fa fa-microphone"></i>
                </button>
                <button id="video-button" className={`stream-control ${vidMuted? 'muted' : ''}`} onClick={() => toggelVideo()}>
                    <i className="fa  fa-video-camera"></i>
                </button>
                <ul className="nav navbar-nav navbar-right" style={{marginRight: "0px", cursor: 'pointer'}}>
                    <li className="dropdown user">
                        <a className="dropdown-toggle" data-toggle="dropdown" style={{color: "black", lineHeight: "unset"}}>
                            Share with friend <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" role="menu">
                            <li  onClick={() => copyUrl()}><a><i className="fa fa-copy"></i>Copy Link</a></li>
                            <li onClick={() => shareFacebook()}><a><i className="fa fa-facebook-f"></i>Facebook</a></li>
                        </ul>
                    </li>

                </ul>

            </div>
        </div>
    )
}


// <button id="share-facebook" className="sharebutton">
// <span>Share on </span><i className="fab fa-facebook-f"></i>
// </button>
// <button id="copyBtn" className="sharebutton" onclick="copyUrl()">
// <span>Get link </span> <i className="far fa-copy"></i>
// </button>