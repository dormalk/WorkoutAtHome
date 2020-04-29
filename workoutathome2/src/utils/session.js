//status 2 = pause
//status 1 = play
import { clickChallenge,clickVideo } from '../actions/auth';

export class Session {
    sessionid;
    createBy;
    participents;
    currentVideoId;
    status;
    currentDuration;
    startAt;

    challangeId;
    reletedVideos;

    constructor(sessionid,createBy){
        this.sessionid = sessionid;
        this.createBy = createBy;
        this.participents = [];
        this.currentVideoId = '';
        this.status = 2;
        this.currentDuration = 0;
        this.startAt = new Date().getTime();
    }

    fromJson({sessionid,createBy,participents,currentVideoId,status,currentDuration,challangeId,reletedVideos,startAt}){
        this.sessionid = sessionid;
        this.createBy = createBy;
        this.participents = participents || [];
        this.currentVideoId = currentVideoId;
        this.status = status
        this.currentDuration = currentDuration;
        this.challangeId = challangeId || null;
        this.reletedVideos = reletedVideos || [];
        this.startAt = startAt;
        return this;
    }

    toJson(){
        return {
            sessionid: this.sessionid,
            createBy: this.createBy,
            participents: this.participents,
            currentVideoId: this.currentVideoId,
            status: this.status,
            currentDuration: this.currentDuration,
            challangeId: this.challangeId || null,
            reletedVideos: this.reletedVideos,
            startAt: this.startAt
        }
    }

    addParticipent(id) {
        if(id !== this.createBy){
            clickVideo(this.currentVideoId);
        }
        if(this.challangeId)clickChallenge(this.challangeId)
        this.participents.push(id);
    }

    removeParticipent(id) {
        this.participents = this.participents.filter(p => id !== p);
    }

    setCurrentVideoId(videoId){
        clickVideo(videoId);
        this.currentVideoId = videoId;
    }

    setStatus(status){
        this.status = status;
    }

    setCurrentDuration(currentDuration){
        if(currentDuration) this.currentDuration = currentDuration;
        else currentDuration = null;
    }

    setChallangeId(challangeId){
        this.challangeId = challangeId;
    }

    isChallenge(){
        return !!this.challangeId;
    }

    setReletedVideos(reletedVideos){
        this.reletedVideos = reletedVideos;
    }

    getNextVideos(){
        const videoId = this.reletedVideos.pop()
        this.currentVideoId = videoId;
        this.currentDuration = 0;
        this.status = 2;
        return videoId;
    }

    removeFromeRelatedVideo(videoId){
        this.reletedVideos = this.reletedVideos.filter(video => video.id !== videoId);
    }
}