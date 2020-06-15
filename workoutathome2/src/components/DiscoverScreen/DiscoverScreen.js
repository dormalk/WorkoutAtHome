import React from 'react';
import { connect } from 'react-redux';
import RewordsList from './RewordsList';
import TopWorkouts from './TopWorkouts';
import { generateUniqKey } from '../../helpers/fucntions';
import {Session} from '../../utils/session';
import {activeGlobalAlert} from '../../actions/system';
import {createNewSession} from '../../actions/workout_session';
import { startSignInWithGoogle } from '../../actions/auth';
import {updateSinglesFilters} from '../../actions/videos';
import {updateChallengesFilters} from '../../actions/challenges';
import Navigation from './Navigation';

const mapDispatchToProps = (dispatch) => ({
  activeGlobalAlert: (alert) => dispatch(activeGlobalAlert(alert)),
  startSignInWithGoogle: () => dispatch(startSignInWithGoogle()),
  updateSinglesFilters: (picked,param) => dispatch(updateSinglesFilters(picked,param)),
  updateChallengesFilters: (picked,param) => dispatch(updateChallengesFilters(picked,param))

})
const mapStateToProps = (state) => ({
  userdata: state.userdata,
  videos: state.videodata.list,
  userTypesPreference: state.userdata.preference && state.userdata.preference.calcTypes

})
export const DiscoverScreen = connect(mapStateToProps,mapDispatchToProps)
    (({userdata,videos,userTypesPreference,activeGlobalAlert,startSignInWithGoogle,updateSinglesFilters,updateChallengesFilters}) => {
//   const onOpenSession = (videoId) => {
//   if(!!userdata.uid){
//         var session = new Session(generateUniqKey(10),userdata.uid);
//         session.setCurrentVideoId(videoId)
//         session.setReletedVideos([videos[0],videos[1],videos[2]])
//         createNewSession(session)
//         .then(() => {
//             window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
//         })
//     } else {
//       if(window.innerWidth < 660)  document.getElementById('main-nav-mobile').click();
//       activeGlobalAlert({type: 'danger', message:'You have to sign-in to create a session'});
//     }
// }
    const onOpenSession = (videoId) => {
      var session = null;
      if(!!userdata.uid){
            session = new Session(generateUniqKey(10),userdata.uid);
      }  else {
        const uniqUserId = generateUniqKey(8);
        localStorage.setItem('uniqUserId', uniqUserId);
        session = new Session(generateUniqKey(10),uniqUserId);
      }
      session.setCurrentVideoId(videoId)
      session.setReletedVideos([videos[0],videos[1],videos[2]])
      createNewSession(session)
      .then(() => {
          window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
      })
    }

  return(
        <div className="st-pusher">
          <div className="st-content">
            <div className="st-content-inner">

              <div className="container-fluid">

                <h1>This Week's Highlights</h1>
                <div className="row">
                  <div className="col-lg-8 col-md-7">
                  {
                    videos.length > 0 &&
                    <TopWorkouts videos={videos}
                                    onOpenSession={(videoid) => onOpenSession(videoid)}
                                    userTypesPreference={userTypesPreference}/>
                  }  
                  </div>
                  <div className="col-lg-4 col-md-5">
                    <RewordsList userdata={userdata} onSignIn={startSignInWithGoogle.bind(this)}/>
                  </div>
                </div>
                <hr/>
                <Navigation pickFilterVideo={updateSinglesFilters.bind(this)}
                            pickFilterChallenge={updateChallengesFilters.bind(this)}/>
                  
              </div>

            </div>

          </div>

        </div>

    )
})