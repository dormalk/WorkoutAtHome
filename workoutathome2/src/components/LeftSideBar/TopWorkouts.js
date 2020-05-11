import React from 'react';
import {Session} from '../../utils/session';
import {createNewSession} from '../../actions/workout_session';
import { generateUniqKey } from '../../helpers/fucntions';

export default ({workouts,videos,userId}) => {

    function openSession(videoId) {
        var session = new Session(generateUniqKey(10),userId);
        session.setCurrentVideoId(videoId)
        session.setReletedVideos([videos[Math.floor(Math.random()*videos.length)],videos[Math.floor(Math.random()*videos.length)],videos[Math.floor(Math.random()*videos.length)]])
        createNewSession(session)
        .then(() => {
            window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
        })
    }


    return(
        <React.Fragment>
            <h4 className="category">Top Plays</h4>
            <div className="sidebar-block list-group list-group-menu list-group-striped">
                {
                    workouts().map(workout => (
                        <div className="list-group-item" key={`${workout.id}_2`} onClick={() => openSession(workout.id)}>
                            <div className="media">
                                <div className="media-left">
                                    <img src={workout.thumbnails} width="35" alt="cover" className="media-object"/>
                                </div>
                                <div className="media-body">
                                    <h4 className="text-h5 media-heading margin-v-1-2"><a>{workout.title}</a></h4>
                                    <p className="text-grey-500">{workout.type}</p>
                                </div>
                            </div>
                        </div>            
                    ))
                }
            </div>
        </React.Fragment>
    )
}