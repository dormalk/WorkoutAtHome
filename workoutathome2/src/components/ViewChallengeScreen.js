/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {connect} from 'react-redux';
import {convertDurationToString} from '../utils/challenge';
import { deparam } from '../helpers/deparam';
import {Session} from '../utils/session';
import { generateUniqKey } from '../helpers/fucntions'
import {createNewSession} from '../actions/workout_session';
import { activeGlobalAlert } from '../actions/system';
import {SingleWorkoutCard} from './Commons/SingleWorkoutCard'
import {takeChallenge} from '../actions/auth';

const mapDispatchToProp = (disptach) => ({
    activeGlobalAlert: (alert) => disptach(activeGlobalAlert(alert)),
    takeChallenge: (userdata, challenge) => disptach(takeChallenge(userdata, challenge))
})

const mapStateToProps = (state) => ({
    challenges: state.challengedata.list,
    uid: state.userdata.uid,
    userdata: state.userdata,
})

export const ViewChallengeScreen = connect(mapStateToProps,mapDispatchToProp)
(({challenges,uid,activeGlobalAlert,userdata,takeChallenge}) => {
    const [challenge,setChallenge] = React.useState(null)
    const [isLogin,setIsLogin] = React.useState(!!uid);
    const [pickedDay,setPickedDay] = React.useState(1);
    const [isSignChallenge, setIsSignChallenge]  = React.useState(false);
    const [challengeProgress, setChallengeProgress] = React.useState(null);
    const [completedDays, setCompletedDays] = React.useState([]);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    React.useEffect(() => {
        const {id} = deparam(window.location.search)
        var challenge = challenges.find((c => c.id === id))
        setChallenge(challenge)
        if(isLogin !== !!uid) setIsLogin(!!uid)

        if(!userdata.signedChallenges) setIsSignChallenge(false)
        else if(userdata.signedChallenges.includes(challenge.id)) setIsSignChallenge(true)
        
        if(userdata.challengesInProgress) {
            const currentChallengeProgress = userdata.challengesInProgress.find(ch=>ch.challengeId === id); 
            if(currentChallengeProgress){
                setChallengeProgress(currentChallengeProgress)
                setPickedDay(currentChallengeProgress.progressDay+1)
            }
            checkCompleteDays();
        }

    },[challenges,uid,isLogin,userdata])
    

    function checkCompleteDays() {
        var completedDaysArr = [];
        if(challenge === null) return;
        if(!challenge.days) return;

        for(let day in challenge.days){
            let completed = true;
            challenge.days[day].forEach(video => {
                let i = findInArr(challengeProgress.completedVideos, video.id)
                if(i) challengeProgress.completedVideos.splice(i,1);
                else completed = false;
            })

            if(completed) {
                completedDaysArr.push(parseInt(day))
            }
        }
        console.log(completedDaysArr)
        if(completedDaysArr.length > 0) setCompletedDays(completedDaysArr)
    }

    function findInArr(arr,elemnt){
        let i = 0;
        let flag = false;
        for(; i < arr.length; i++){
            if(arr[i] === elemnt) {
                flag = true;
                break;
            };
        }
        return flag;
    }

    function renderPane(){
        return challenge.days[pickedDay-1].map((v,index) => <SingleWorkoutCard video={v} onClick={(videoId) => onOpenSession(videoId)} key={index}/>)            
    }


    function renderTabs(){
        var tabs = [];
        const days = challenge.days.length;
        console.log(completedDays)
        for(let i = 1; i <= days; i++){
            console.log(completedDays.includes(i-1))
            tabs.push(  <li key={i} className={`${pickedDay === i? 'active': ''} ${completedDays.includes(i-1)? 'done': ''}`} onClick={() => setPickedDay(i)}>
                            <a href={`day${i}`} data-toggle="tab"><i className="fa fa-fw fa-star"></i> Day {i}</a>
                        </li>)
        }
        return tabs;

    }


    const onOpenSession = (videoId) => {
        if(isLogin){
            if(userdata.challengesInProgress && userdata.challengesInProgress.find(c => c.challengeId === challenge.id)){
                var session = new Session(generateUniqKey(10),uid);
                session.setCurrentVideoId(videoId)
                session.setChallangeId(challenge.id)
                session.setReletedVideos(challenge.days[pickedDay-1]);
                createNewSession(session)
                .then(() => {
                    window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
                })
            }
            else {
                activeGlobalAlert({type: 'danger', message:'You must take the challenge first'})
            }

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
                                            <button className={`btn ${isLogin?'btn-indigo-500':'btn-danger'}`} disabled={!isLogin || isSignChallenge} onClick={() => takeChallenge(userdata, challenge)}>{isLogin? isSignChallenge? 'You are taked this challenge' : 'Take this challnege now!': 'You have to sign-in for taking this challenge'}</button>
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
