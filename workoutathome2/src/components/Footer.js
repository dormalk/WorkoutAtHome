import React from 'react';


export const Footer = () => {
    return (
        <div className="footer">
            <div id="audio" className="player audio player-control-primary player-white" role="application" aria-label="media player">
            <div id="jquery_jplayer_audio_1" className="jplayer"></div>
            <div className="gui-wrapper">
                <div className="gui">
                <div className="play-control control">
                    <button  className="play button" aria-label="play" tabIndex="0"></button>
                </div>
                <div className="bar">
                    <div className="seek-bar seek-bar-display"></div>
                    <div className="seek-bar">
                    <div className="play-bar"></div>
                    <div className="details"><span className="title" aria-label="title"></span></div>
                    <div className="timing"><span className="duration" role="timer" aria-label="duration"></span></div>
                    </div>
                </div>
                </div>
            </div>
            <div className="no-solution">
                Media Player Error<br/>
                Update your browser or Flash plugin
            </div>
            </div>
        </div>

    )
}