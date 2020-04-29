/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {convertDurationToString} from '../../utils/video';

export default ({videoList,onOpenSession}) => {
    return (
        <div>
            <h2>Single Workouts</h2>
            <div className="row gridalicious" data-toggle="gridalicious" data-width="200" id="workouts">
                {
                    videoList && videoList.map(video => 
                        <div className="panel panel-default" key={video.id}>
                            <div className="cover overlay hover cover-image-full" style={{height: 'unset'}}>
                                <img src={video.thumbnails} alt="music" />
                                <div className="overlay overlay-full overlay-hover overlay-bg-black">
                                    <div className="v-center">
                                        <a className="btn btn-lg btn-circle btn-white" onClick={() => onOpenSession(video.id)}><i className="fa fa-play"></i></a>
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
              
        </div>
    )
}