import React from 'react';
import {Session} from '../../utils/session';
import {createNewSession} from '../../actions/workout_session';
import { generateUniqKey } from '../../helpers/fucntions';
import {withRouter} from 'react-router-dom';

export default withRouter(({activities,videos,userId,history}) => {


    function openSession(videoId) {
        var session = new Session(generateUniqKey(10),userId);
        session.setCurrentVideoId(videoId)
        session.setReletedVideos([videos[Math.floor(Math.random()*videos.length)],videos[Math.floor(Math.random()*videos.length)],videos[Math.floor(Math.random()*videos.length)]])
        createNewSession(session)
        .then(() => {
            window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
        })
    }

    function handleAddVideo(activity){
        return(
            <p key={activity.videoId}>
                <i className="fa fa-fw icon-paper-document text-pink-500"></i>
                <a className="sidebar-link" onClick={() => openSession(activity.videoId)} style={{cursor: 'pointer'}}>
                    You have create new workout {(activity.title || activity.videoId).substring(0,10)}...
                </a>
            </p>
        )
    }

    function handleAddChallenge(activity) {
        return(
            <p key={activity.chellengeId}>
                <i className="fa fa-fw icon-paper-document text-pink-500"></i>

                <a className="sidebar-link" onClick={() => history.push('/challenge?id='+activity.chellengeId)} style={{cursor: 'pointer'}}>
                    You have create new challenge {activity.title || activity.chellengeId}
                </a>
            </p>
        )
    }
    return(
      <React.Fragment>
        <h4 className="category">Activity</h4>
        <div className="sidebar-block">
            {
                activities.map(activity=> {
                    if(activity.type === 'addVideo') return handleAddVideo(activity);
                    if(activity.type === 'createChallenges') return handleAddChallenge(activity);

                    return null;
                })
            }
          <p><i className="fa fa-fw icon-music-note-2 text-pink-500"></i> <a href="#none" className="sidebar-link">Listen <strong>Bloom</strong>, the New single from Voyager</a></p>
          <a className="btn btn-xs btn-pink-500" href="#none">more</a>
        </div>

      </React.Fragment>  
    )
})