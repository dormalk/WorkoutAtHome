import React from 'react';
import {Session} from '../../utils/session';
import {createNewSession} from '../../actions/workout_session';
import { generateUniqKey } from '../../helpers/fucntions';
import {withRouter} from 'react-router-dom';

export default withRouter(({activities,videos,userId,history}) => {
    const [limit ,setLimit] = React.useState(3);

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
            <p  key={`${generateUniqKey(6)}`}>
                <i className="fa fa-fw icon-paper-document text-pink-500"></i>
                <a className="sidebar-link" onClick={() => openSession(activity.videoId)} style={{cursor: 'pointer'}}>
                    You are created new workout {(activity.title || activity.videoId).substring(0,10)}...
                </a>
            </p>
        )
    }

    function handleAddChallenge(activity) {
        return(
            <p  key={`${generateUniqKey(6)}`}>
                <i className="fa fa-fw icon-paper-document text-pink-500"></i>

                <a className="sidebar-link" onClick={() => history.push('/challenge?id='+activity.chellengeId)} style={{cursor: 'pointer'}}>
                    You are create new challenge {activity.title || activity.chellengeId}
                </a>
            </p>
        )
    }

    function handleClickChallenge(activity) {
        return(
            <p  key={`${generateUniqKey(6)}`}>
                <i className="fa fa-fw icon-paper-document text-pink-500"></i>

                <a className="sidebar-link" onClick={() => history.push('/challenge?id='+activity.id)} style={{cursor: 'pointer'}}>
                    You have visited in challenge {activity.title || activity.chellengeId}
                </a>
            </p>
        )
    }


    function handleClickVideo(activity){
        return(
            <p  key={`${generateUniqKey(6)}`}>
                <i className="fa fa-fw icon-paper-document text-pink-500"></i>

                <a className="sidebar-link" onClick={() => openSession(activity.videoId)}style={{cursor: 'pointer'}}>
                    You did workout {activity.title || activity.videoId}
                </a>
            </p>
        )
    }

    return(
      <React.Fragment>
        <h4 className="category">Activity</h4>
        <div className="sidebar-block">
            {
                activities && activities.filter((item,index) => index < limit).map(activity=> {
                    if(activity.type === 'addVideo') return handleAddVideo(activity);
                    if(activity.type === 'createChallenges') return handleAddChallenge(activity);
                    if(activity.type === 'clickVideo') return handleClickVideo(activity);
                    if(activity.type === 'clickChallenge') return handleClickChallenge(activity)
                    return null;
                })
            }
        {
            limit <= 3 && <a className="btn btn-xs btn-pink-500" onClick={() => setLimit(5)}>more</a>
        }
        </div>

      </React.Fragment>  
    )
})