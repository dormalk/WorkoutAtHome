/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {SingleWorkoutCard} from '../Commons/SingleWorkoutCard';
export default ({videos,onPick}) => {
    return(
        <div id="suggest_video" className="portrait">
            <div className="panel panel-default">
                <h4 className="page-section-heading">Pick your next workout!</h4>
                <div className="row gridalicious" data-toggle="gridalicious" data-width="200" id="workouts">
                {
                    videos && videos.map(video => <SingleWorkoutCard key={video.id} video={video} onClick={(videoId) => onPick(videoId)}/>)
                }
                </div>
                <button className="btn btn-danger" onClick={() => window.close()}>I want to end the session</button>
            </div>
        </div>
    )
}