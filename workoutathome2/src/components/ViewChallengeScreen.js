/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {connect} from 'react-redux';
import {convertDurationToString} from '../utils/challenge';
import { deparam } from '../helpers/deparam';
import {Session} from '../utils/session';
import { generateUniqKey } from '../helpers/fucntions'
import {createNewSession} from '../actions/workout_session';
import { activeGlobalAlert } from '../actions/system';
import {updateUser} from '../actions/auth';

const mapDispatchToProp = (disptach) => ({
    activeGlobalAlert: (alert) => disptach(activeGlobalAlert(alert)),
    updateUser: (update) => disptach(updateUser(update))
})

const mapStateToProps = (state) => ({
    challenges: state.challengedata.list,
    uid: state.userdata.uid,
    userdata: state.userdata,
})

export const ViewChallengeScreen = connect(mapStateToProps,mapDispatchToProp)(({challenges,uid,activeGlobalAlert,userdata,updateUser}) => {
    const [challenge,setChallenge] = React.useState(null)
    const [isLogin,setIsLogin] = React.useState(!!uid);
    const [pickedDay,setPickedDay] = React.useState(1);
    const [isSignChallenge, setIsSignChallenge]  = React.useState(false);

    React.useEffect(() => {
        const {id} = deparam(window.location.search)
        var challenge = challenges.find((c => c.id === id))
        setChallenge(challenge)
        if(isLogin !== !!uid) setIsLogin(!!uid)

        if(!userdata.signedChallenges)setIsSignChallenge(false)
        else if(userdata.signedChallenges.includes(challenge.id)) setIsSignChallenge(true)
    },[challenges,uid,isLogin,userdata])
    
    function renderPane(){
        return challenge.days[pickedDay-1].map(v => renderCard(v))            
    }

    function renderCard(video){
        return(
            <div className="panel panel-default" key={video.id} style={{display: 'flex', width: "100%"}}>
                <div className="cover overlay hover cover-image-full" style={{flex: 1, margin: "0px"}}>
                    <img src={video.thumbnails} alt="music" />
                    <div className="overlay overlay-full overlay-hover overlay-bg-black">
                        <div className="v-center">
                            <a className="btn btn-lg btn-circle btn-white" onClick={() => onOpenSession(video.id)}><i className="fa fa-play"></i></a>
                        </div>
                    </div>

                </div>
                <div className="panel-body" style={{flex: 2}}>
                    <h4 className="margin-none title">{}</h4>
                    <span className="text-grey-500">{video.type}</span><br/>
                    <span className="text-grey-500">{convertDurationToString(video.duration)}</span>
                </div>
            </div>
        )
    }

    function takeChallenge(){
        if(!userdata.signedChallenges){
            userdata.signedChallenges = [];
        }
        userdata.signedChallenges.push(challenge.id);
        updateUser(userdata)
        .then(() => {

        })
    }

    function renderTabs(){
        var tabs = [];
        const days = challenge.days.length;
        for(let i = 1; i <= days; i++)
            tabs.push(  <li key={i} className={`${pickedDay === i? 'active': ''}`} onClick={() => setPickedDay(i)}>
                            <a href={`day${i}`} data-toggle="tab"><i className="fa fa-fw fa-star"></i> Day {i}</a>
                        </li>)
        return tabs;

    }


    const onOpenSession = (videoId) => {
        if(isLogin){
            var session = new Session(generateUniqKey(10),uid);
            session.setCurrentVideoId(videoId)
            session.setChallangeId(challenge.id)
            session.setReletedVideos(challenge.days[pickedDay-1]);
            createNewSession(session)
            .then(() => {
                window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
            })
        } else {
            activeGlobalAlert({type: 'danger', message:'You have to sign-in first'})
        }
    }

    return(
        <div className="st-pusher">
            <div className="st-content">
                <div className="st-content-inner">
                    <div className="container-fluid" id="challenge_unit">
                        {
                            challenge &&
                            <React.Fragment>
                                <section>
                                <div className="panel panel-default" style={{marginBottom: "35x"}}>
                                    <div className="cover overlay hover cover-image-full" style={{height: 'unset'}}>
                                        <img src={ challenge.thumbnails} alt="music" />
                                    </div>
                                    <div className="panel-body">
                                        <h4 className="margin-none title">{challenge.title}</h4>
                                        <span className="text-grey-500">{challenge.tagTypes.map(type=> <span key={type}>{type} </span>)}</span><br/>
                                        <span className="text-grey-500">{convertDurationToString(challenge.avgDuration)}</span><br/>
                                        <hr/>
                                        <center>
                                            <button className={`btn ${isLogin?'btn-indigo-500':'btn-danger'}`} disabled={!isLogin || isSignChallenge} onClick={() => takeChallenge()}>{isLogin? isSignChallenge? 'You are taked this challenge' : 'Take this challnege now!': 'You have to sign-in for taking this challenge'}</button>
                                        </center>
                                    </div>
                                </div>   
                                </section>
                                <section> 
                                <h4 className="page-section-heading">Challenge's Workout Plan</h4>
                                <div className="panel panel-default">
                                    <div className="tabbable tabs-vertical tabs-left" style={{width: "100%"}}>
                                        <ul className="nav nav-tabs">
                                            {
                                                renderTabs()
                                            }              
                                        </ul>
                                        <div className="tab-content">
                                        {
                                            renderPane()
                                        }
                                        </div>     
                                    </div> 
                                </div>
                                </section>    
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})
