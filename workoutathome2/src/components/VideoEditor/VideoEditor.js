import React from 'react';
import LeftController from './LeftController';
import { VideoPlayer } from '../Commons';


// var editorConfigs = {
//     videoPath: '',
//     duration: '',
//     componentsPosition: [], //['top', 'right'] ['top','left'] ['bottom','right'] ['bottom','left']
//     components: []
// }

// var component = {
//     startAt: 0, //time
//     endAt: 0, //time
//     title: '',
//     titleColor: '',
//     subTitle: '',
//     subTitleColor: '',
//     counter: 0,
//     counterColor: ''
// }

const INITIAL_VIDEO_STATE = {
    timestemp: 0,
    isPlaying: false
}

export const VideoEditor = () => {
    const [videoState, setVideoState] = React.useState(INITIAL_VIDEO_STATE)

    return(
        <React.Fragment>
            <LeftController showBar={true}/>
            <div className="st-pusher"  id="video-editor">
                <div className="st-content">
                    <div className="st-content-inner">
                        <div className="container-fluid">
                            <VideoPlayer    src="./assets/videos/test.mp4"
                                            autoplay={false}
                                            style={{width: '100%', height: '100%'}}
                                            onSeeking={(event) => setVideoState({...videoState, timestemp: event.timestemp})}
                                            onPlay={(event) => setVideoState({isPlaying: true, timestemp: event.timestemp})}
                                            onPause={(event) => setVideoState({isPlaying: false, timestemp: event.timestemp})}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}