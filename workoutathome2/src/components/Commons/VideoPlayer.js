import React from 'react';

export const VideoPlayer = ({src,autoplay,onSeeking,onPlay, onPause, style}) => {

    React.useEffect(() => {
        var video = document.getElementById('video');
        if(onSeeking) video.addEventListener('seeking', onSeeking.bind(this));
        if(onPlay) video.addEventListener('play', onPlay.bind(this))
        if(onPause) video.addEventListener('pause', onPause.bind(this))

        return (() => {
            video.removeEventListener('seeking', onSeeking.bind(this))
            video.removeEventListener('play', onPlay.bind(this))
            video.removeEventListener('pause', onPause.bind(this))
        })
    })

    return(
        <video  controls
                id="video" 
                autoPlay={autoplay} 
                style={style}>
            <source src={src}/>
        </video>
    )
}