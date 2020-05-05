import React from 'react';
import {convertDurationToString} from '../../utils/video';

export const SingleWorkoutCard = ({video, onClick}) => {
    return(
        <div className="panel panel-default" key={video.id}  onClick={() => onClick(video.id)} style={{cursor: 'pointer'}}>
            <div className="cover overlay hover cover-image-full" style={{height: 'unset'}}>
                <img src={video.thumbnails} alt="music" />
                <div className="overlay overlay-full overlay-hover overlay-bg-black">
                    <div className="v-center">
                        <a className="btn btn-lg btn-circle btn-white"><i className="fa fa-play"></i></a>
                    </div>
                </div>
            </div>
            <div className="panel-body">
                <h4 className="margin-none title"><a>{video.title}</a></h4>
                <span className="text-grey-500">{video.type}</span><br/>
                <span className="text-grey-500">{convertDurationToString(video.duration)}</span>
            </div>
    </div>

    )
}