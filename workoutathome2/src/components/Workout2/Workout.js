import React from 'react';
import ParticipentList from './ParticipentsList';
import * as RTCMultiConnection from 'rtcmulticonnection';
import {deparam} from '../../helpers/deparam';
import {getMediaElement} from '../../helpers/getMediaElement';
import { connect } from 'react-redux';
import {    isSessionExist,
            updateExistSession,
            closeSession,
            sendEvent,
            listenToSession } from '../../actions/workout_session';
import {activeGlobalAlert} from '../../actions/system';
import {    updateUser,
            increaseCounter,
            takeChallenge,
            addCompleteVideoToChallengeInProgress} from '../../actions/auth';
import {Session} from '../../utils/session';
import YouTubeVideo from './YoutubeVideo';
import ControlPannel from './ControlPannel';
import { withRouter } from 'react-router-dom';
import SuggestOtherVideos from './SuggestOtherVideos';


var globalSession = new Session();
var globalUserId;
var player = null;

var praiseShown = false;
var lockScreen = false;
var randomParise = ['Good Job!', 'Well Done!!', 'You are GREAT!', 'GO GO GO', 'Almost there', 'Yeaaaa!', 'Have Fun!', 'You can Do It :-)']
var randomPraiseClass = ['random1','random2','random3','random4','random5','random6','random7'];
var workoutsCountFlag = false;
var challengeCountFlag = false;
var completeVideoFlag = false;
var friendsCountsFlag = false;
function showPraise(word,duration){
    var praise = document.getElementById('prais-message');
    var value = Math.floor(Math.random() * randomPraiseClass.length);
    var praiseClass = randomPraiseClass[value];
    praise.innerText = word;
    praise.classList.add('active')
    praise.classList.add(praiseClass);
    praiseShown = true;
    setTimeout(function(){
      praise.classList.remove('active')
      praise.classList.remove(praiseClass);
      praiseShown = false;
    },duration)
}


export class WorkoutFoo extends React.Component {

    constructor(props){
        super(props);
        var params = deparam(window.location.search);
        var {sessionid} = params;
        var {uid} = props;
        globalUserId = uid;

        this.state = {
            sessionId: sessionid || null,
            userId: uid || '',
            session: null,
            showCover: false,
            endOfVideo: false
        }

        this.updateDatabase(sessionid);

        window.addEventListener('beforeunload', (e) => {
            // Cancel the event
            var {sessionid,createBy} = globalSession.toJson();
            if(globalUserId === createBy){
                const precetage = this.calcPrecetage(Math.floor(player.getDuration() - globalSession.currentDuration))
                if(!friendsCountsFlag && precetage < 50 && precetage > 0){
                    var {userdata} = this.props;
                    increaseCounter('friendsCount',(globalSession.participents.length - 1))
                    friendsCountsFlag = true;
                    if(!userdata.frineds) userdata.frineds = [];
                    globalSession.participents.forEach((participent) => {
                        if(participent !== uid && !userdata.frineds.includes(participent)) userdata.frineds.push(participent);
                    }) 
                    this.props.startUpdateUser(userdata)

                }
                sendEvent(sessionid,'closeSession',{})
                .then(() => closeSession(globalSession.toJson()))
            } else {
                globalSession.removeParticipent(globalUserId);
                updateExistSession(globalSession.toJson())
            }
            e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
            // Chrome requires returnValue to be set
            e.returnValue = 'Bye Bye';
        });

        setInterval(() => {
            if(player && this.isAdmin()) {
                globalSession.setCurrentDuration(player.getCurrentTime())
                updateExistSession(globalSession.toJson())
            }
            if(player) {
                // this.updateLoadBar();
                var secondLeft = Math.floor(player.getDuration() - globalSession.currentDuration);
                if(this.isAdmin() && secondLeft >= 0 && secondLeft < 15) this.setState({endOfVideo: true})
                else if(this.state.endOfVideo) this.setState({endOfVideo: false})
                const precetage = this.calcPrecetage(secondLeft)
                
                if(uid && precetage < 50 && precetage > 0) {
                    if(!workoutsCountFlag) {
                        increaseCounter('workoutsCount',1)
                        workoutsCountFlag = true;
                    }
                    if(!challengeCountFlag && !!globalSession.challangeId && globalSession.reletedVideos.length === 0) {
                        challengeCountFlag = true;
                        increaseCounter('challengeCount',1)
                    }
                    if(!completeVideoFlag){
                        completeVideoFlag = true;
                        this.props.addCompleteVideo(this.props.userdata, globalSession.challangeId, globalSession.currentVideoId);
                    }
                }
            }
        },1000)
    }

    isAdmin() {
        return this.state.session.createBy === this.state.userId
    }

    constructConnection(){
        this.connection = new RTCMultiConnection();
        this.connection.socketURL = 'https://mighty-stream-12956.herokuapp.com:443/';
        // this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
        // this.connection.socketURL = 'https://localhost:8080';
        this.connection.socketMessageEvent = 'video-conference-demo';
        this.connection.session = {
            audio: true,
            video: true
        };

        this.connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
    }
    buildElement(sessionid) {
        this.connection.openOrJoin(sessionid, function() {})

        this.connection.onstream = function (event) {
            var width = '100%';
            var  videosContainer = document.getElementById('participents-list');
            var mediaElement = getMediaElement(event.mediaElement, {
                title: event.userid,
                buttons: ['mute-video', 'mute-audio'],
                width: width,
                showOnMouseEnter: true
            });
            mediaElement.className = 'participent-card';
            videosContainer.appendChild(mediaElement);
            // mediaElement.appendChild(generateRandomImage());


            setTimeout(function () {
                mediaElement.media.play();
            }, 5000);

            mediaElement.id = event.streamid;
        };


        this.connection.onstreamended = function (event) {
            var mediaElement = document.getElementById(event.streamid);
            if (mediaElement) {
                mediaElement.parentNode.removeChild(mediaElement);
            }
        };
    }

    addToExistSession(session){
        var {userId,sessionId} = this.state;
        var {challengesInProgress} = this.props.userdata;
        globalSession = new Session().fromJson(session);
        globalSession.addParticipent(userId)
        if(!!globalSession.challangeId && !!userId){
            if(!challengesInProgress || !challengesInProgress.find(c=> c.challengeId === globalSession.challangeId)) {
                this.props.takeChallenge(this.props.userdata, globalSession.challangeId)
            } 
            this.updateAndListen(sessionId);
        } else {
            if(!!globalSession.challangeId){                
                this.props.activeGlobalAlert('danger',"First you have to sign-in")
                this.redirect();
            }else {
                this.updateAndListen(sessionId);
            }
        }

    }

    updateAndListen(sessionId){
        this.setState({session: globalSession.toJson()});
        updateExistSession(globalSession.toJson())
        .then(() => {
            listenToSession(sessionId)
            .on('value', snapshot => {
                if(snapshot.val())this.hendelEvents(snapshot.val());
            })

        })
    }


    updateDatabase(sessionid){
        if(sessionid){
            isSessionExist(sessionid)
            .once('value',snapshot => {
                const session = snapshot.val();
                if(session){
                    this.initAllElements(session);
                    this.addToExistSession(session);
                } else  {
                    this.props.activeGlobalAlert('danger',"This session dosn't exist on database")
                    this.redirect()
                };
            })
        }
        else  {
            this.props.activeGlobalAlert('danger',"You didn't provied SessionId")
            this.redirect();
        }

    }

    initAllElements({sessionid}){
        this.constructConnection();
        this.buildElement(sessionid);
    }

    sendPraise() {
        if(!praiseShown){
            const {sessionId} = this.state;
            var value = Math.floor(Math.random() * randomParise.length);
            sendEvent(sessionId,'praise', randomParise[value]);
        }
    }

    redirect(){
        this.props.history.push('/')
    }

    hendelEvents({code,body}){
        if(code === 'praise'){
            showPraise(body.message,2500);
        } else if (code === 'updateVideoStateAndTime') {
            const {current_time,status} = body.message;
            globalSession.setCurrentDuration(current_time);
            globalSession.setCurrentDuration(status);
            this.setState({session: globalSession.toJson()})
            if(!this.isAdmin() && player){
                player.seekTo(current_time);
                if(status === 2) player.pauseVideo()
                else if(status === 1) {
                    this.playVideoWithCount()
                }
            }
        } else if (code === 'closeSession'){
            if(!this.isAdmin()){
                this.props.activeGlobalAlert('danger',"The owner leave the session")
                this.redirect();
            }
        } else if (code === 'change') {
            if(!this.isAdmin()){
                globalSession.setCurrentVideoId(body.message);
                globalSession.setCurrentDuration(0);
                player.seekTo(0);
                globalSession.removeFromeRelatedVideo(body.message);
                this.setState({session: globalSession.toJson()});    
            }
        }
    }

    onYoutubeStatusChange({data,target}){
        if(!lockScreen){
            if (this.isAdmin() && (data === 1 || data === 2)) {
                globalSession.setStatus(data);
                globalSession.setCurrentDuration(target.getCurrentTime())
                updateExistSession(globalSession.toJson())
                this.setState({session: globalSession.toJson()})
                sendEvent(globalSession.sessionid,'updateVideoStateAndTime',{current_time: globalSession.currentDuration, status: globalSession.status})
                if(data === 1){
                    lockScreen = true;
                    if(this.isAdmin()) {
                        this.setState({showCover: true})
                    }
                    target.pauseVideo();
                    this.playVideoWithCount();
                }
            }
        }
    }
   
    playVideoWithCount(){
        setTimeout(function(){
          showPraise('3',800)
        },0)
        setTimeout(function(){
            showPraise('2',800)
        },1000)
        setTimeout(function(){
            showPraise('1',800)
        },2000)
        setTimeout(function(){
          player.playVideo();
        },3000)
        setTimeout(() => {
          lockScreen = false;
          if(this.isAdmin()) {
            this.setState({showCover: false})
        }
        },4000)
    }

    onPlayerReady({target}){
        player = target;
    }

    toggelStreamConnection(isOn,what){
        if(isOn) this.connection.attachStreams[0].mute(what);
        else this.connection.attachStreams[0].unmute(what);
    }

    calcPrecetage(secondLeft){
        if(player){
            return secondLeft/player.getDuration()*95;
        } 
        return 0;
    }

    updateLoadBar(){
        var timeleft = document.getElementById('timeleft');
        var gamification = '';
        var secondLeft = Math.floor(player.getDuration() - player.getCurrentTime());
        var minutes = Math.floor(secondLeft/60);
        var seconds = Math.floor(secondLeft%60);
        var timeString = '';
        if(minutes >= 1){
          if(seconds < 10){
            seconds = `0${seconds}`;
          }
          timeString = `${minutes}:${seconds} Minutes`
        } else {
            timeString = `${seconds} Seconds`
        }
      
        var precetage = this.calcPrecetage();
        if(Math.floor(player.getDuration() - player.getCurrentTime()) === 0){
          gamification = 'FINISH!'
          timeleft.innerText = `${gamification}`;
        }
        else if(precetage < 25){
          gamification = ', You Almost Done!'
          timeleft.innerText = `${timeString} ${gamification}`;
        }
        else if(precetage < 50){
          gamification = ', Half Way There!'
          timeleft.innerText = `${timeString} ${gamification}`;
        }
        else if(precetage < 75){
          gamification = ', Good Job!'
          timeleft.innerText = `${timeString} ${gamification}`;
        } else {
          gamification = ' Left'
          timeleft.innerText = `${timeString} ${gamification}`;
        }
        var load = document.getElementById('load');
        load.style.width = `${precetage}%`
    }

    onPickVideo(videoId){
        globalSession.setCurrentVideoId(videoId);
        globalSession.setCurrentDuration(0);
        player.seekTo(0);
        globalSession.removeFromeRelatedVideo(videoId);
        this.setState({session: globalSession.toJson(),endOfVideo: false });
        sendEvent(this.state.sessionId, 'change', videoId);
    }

    handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism
        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        return event;
        // Use event.pageX / event.pageY here
    }


    render(){
        var {session} = this.state;
        return(
            <React.Fragment>
                {this.state.endOfVideo && session.reletedVideos && <SuggestOtherVideos videos={session.reletedVideos} onPick={(videoId) => this.onPickVideo(videoId)}/>}
                <div style={{display: 'flex', height: "100%", width: "100vw"}}>
                    <div id="main-page">
                        <ControlPannel toggelStreamConnection={(isOn,what) => this.toggelStreamConnection(isOn,what)}/>
                        <section>
                            {session && (this.state.showCover || (this.state.userId !== this.state.session.createBy)) && <div id="cover"></div>}
                            {session && <YouTubeVideo    videoId={session.currentVideoId}
                                                                status={session.status}
                                                                time={session.currentDuration}
                                                                onPlayerReady={(event) => this.onPlayerReady(event)}
                                                                stateChange={(event) => this.onYoutubeStatusChange(event)}/>}
                        </section>
                        <ParticipentList    onSendPraise={() => this.sendPraise()}
                                            handleMouseMove={() => this.handleMouseMove()}/>

                    </div>
                </div>


                <div id="global-message">
                </div>

                <div id="prais-message">
                </div>

            </React.Fragment>
            )
        }
    }

const mapDisptachToProps = (dispatch) => ({
    activeGlobalAlert: (type,message) => dispatch(activeGlobalAlert({type,message})),
    startUpdateUser: (user) => dispatch(updateUser(user)),
    takeChallenge: (userdata,challenge) => dispatch(takeChallenge(userdata,challenge)),
    addCompleteVideo: (userdata,challengeId, videoId) => dispatch(addCompleteVideoToChallengeInProgress(userdata,challengeId, videoId))
})
const mapStateToProps = (state) => ({
    uid: state.userdata.uid,
    userdata: state.userdata
})

export const Workout = withRouter(connect(mapStateToProps,mapDisptachToProps)(WorkoutFoo));