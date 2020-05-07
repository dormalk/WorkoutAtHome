import * as firebase from 'firebase';
import { hendleUndefiendJSON, generateUniqKey, convertToArr } from '../helpers/fucntions';
import { getTagTypes } from '../utils/challenge';

export const login = (uid) => {
    return(dispatch) => {
        dispatch({type: 'IN_LOAD'})
        firebase.database().ref(`users/${uid}`)
        .once('value',snapshot => {
            const user = snapshot.val()
            if(user){
                    user.emailVerified = firebase.auth().currentUser.emailVerified;
                    Promise.all([
                        getLastActivities(uid, 'AddVideos'),
                        getLastActivities(uid, 'clickVideo'),
                        getLastActivities(uid, 'createChallenges'),
                        getLastActivities(uid, 'clickChallenge')
                    ])
                    .then(results => {
                        if(!user.activities) user.activities = [];
                        convertToArr(results[0]).map(res =>  { return {...res, type: 'addVideo'}}).forEach(res => user.activities.push(res));
                        convertToArr(results[1]).map(res =>  { return {...res, type: 'clickVideo'}}).forEach(res => user.activities.push(res));
                        convertToArr(results[2]).map(res =>  { return {...res, type: 'createChallenges'}}).forEach(res => user.activities.push(res));
                        user.activities = user.activities.sort((v1,v2) => v2.datetime-v1.datetime)
                        console.log(user.activities)
                        dispatch({type:'LOGIN', user })
                    })
            }
            else {
                dispatch(logout());
            }
        },(err) => {
            console.error(err)
        })

    }
}

export const logout = () => {
    console.log('logout')
    return(dispatch) => {
        return firebase.auth().signOut()
        .then(() =>dispatch({type: 'LOGOUT'}))
    }
}



export const startSignInWithGoogle = () => {
    return() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)

    }
}

export const updateUser = (user) => {
    return(dispatch) => {
        return firebase.database().ref(`users/${user.uid}`).update(hendleUndefiendJSON(user))
        .then(snapshot => {
            dispatch({type: 'UPDATE_USER', user})
        })    
    }
}


export const sendVarificationMail = () => {
    return firebase.auth().currentUser.sendEmailVerification();
}



export const clickVideo = (videoId) => {
    firebase.database().ref('videos/'+videoId).once('value',snapshot => {
        var {type,videoId,clicks,title} = snapshot.val();
        if(!clicks) clicks = 0;
        clicks++;
        firebase.database().ref('videos/'+videoId+'/clicks').set(clicks);
        analytics('clickVideo',{type,videoId,title})
    })
}

export const clickChallenge = (challengeId) => {
    firebase.database().ref('challenges/'+challengeId).once('value',snapshot => {
        var {id,clicks,title} = snapshot.val();   
        if(!clicks) clicks = 0;
        clicks++;
        var tagTypes = getTagTypes(snapshot.val())
        firebase.database().ref('challenges/'+id+'/clicks').set(clicks);
        analytics('clickChallenge',{tagTypes,id,title})
    })
}


export const analytics = (event,body) => {
    if(firebase.auth().currentUser){
        const userId = firebase.auth().currentUser.uid;
        const key = generateUniqKey(8);
        if(userId){
            body.datetime = new Date().getTime();
            firebase.database().ref(`analytics/${userId}/${event}/${key}`).set(body);
        }
    }
}




export const increaseCounter = (counterName, countUp) => {
    const userId = firebase.auth().currentUser.uid
    firebase.database().ref('users').child(userId).child(counterName).transaction(count => {
        return (count || 0) + countUp
    })    

}




export const takeChallenge = (userdata, challenge) => {
    return (dispatch) => {
        if(!userdata.challengesInProgress){
            userdata.challengesInProgress = [];
        }
        const challengeProgress = {
            challengeId: challenge.id || challenge,
            completedVideos: [],
        }
        console.log(userdata.challengesInProgress.find(c => c.challengeId === challengeProgress.challengeId))
        if(!userdata.challengesInProgress.find(c => c.challengeId === challengeProgress.challengeId)){
            userdata.challengesInProgress.push(challengeProgress);
            dispatch(updateUser(userdata))
        }
    }
}

export const addCompleteVideoToChallengeInProgress = (userdata,challengeId, videoId) => {
    return (dispatch) => {
        const updatedUserdata = userdata.challengesInProgress.map(ch => {
            if(ch.challengeId === challengeId){
                if(!ch.completedVideos) ch.completedVideos = [];
                ch.completedVideos.push(videoId);
            }
            return ch;
        })
        dispatch(updateUser(updatedUserdata));
    }
}

export const getLastActivities = (userId, activityName , limit) => new Promise((resolve,reject) => {
    if(!limit) limit = 2;
    return firebase.database().ref('analytics/'+userId)
    .child(activityName)
    .orderByChild('datetime')
    .limitToLast(limit)
    .once('value', snapshot => resolve(snapshot.val()))
})
