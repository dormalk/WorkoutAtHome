/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {convertDurationToString} from '../../utils/video';

export default ({videos,onPick}) => {
    return(
        <div id="suggest_video" >
            <div className="panel panel-default">
                <h4 className="page-section-heading">Pick your next workout!</h4>
                <div className="row gridalicious" data-toggle="gridalicious" data-width="200" id="workouts">
                {
                    videos && videos.map(video => 
                        <div className="panel panel-default" key={video.id}>
                            <div className="cover overlay hover cover-image-full" style={{height: 'unset'}}>
                                <img src={video.thumbnails} alt="music" />
                                <div className="overlay overlay-full overlay-hover overlay-bg-black">
                                    <div className="v-center">
                                        <a className="btn btn-lg btn-circle btn-white" onClick={() => onPick(video.id)}><i className="fa fa-play"></i></a>
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
                </div>
                <button className="btn btn-danger">I want to end the session</button>
            </div>
        </div>
    )
}