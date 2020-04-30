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
                dispatch({type:'LOGIN', user })
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
        var {type,videoId,clicks} = snapshot.val();
        if(!clicks) clicks = 0;
        clicks++;
        firebase.database().ref('videos/'+videoId+'/clicks').set(clicks);
        analytics('clickVideo',{type,videoId})
    })
}

export const clickChallenge = (challengeId) => {
    firebase.database().ref('challenges/'+challengeId).once('value',snapshot => {
        var {id,clicks} = snapshot.val();   
        if(!clicks) clicks = 0;
        clicks++;
        var tagTypes = getTagTypes(snapshot.val())
        firebase.database().ref('challenges/'+id+'/clicks').set(clicks);
        analytics('clickChallenge',{tagTypes,id})
    })
}


export const analytics = (event,body) => {
    const userId = firebase.auth().currentUser.uid;
    const key = generateUniqKey(8);
    if(userId){
        body.datetime = new Date().getTime();
        firebase.database().ref(`analytics/${userId}/${event}/${key}`).set(body);
    }
}


export const fetchAnalytics = (userId,event) => {
    return(dispatch) => {
        return firebase.database().ref(`analytics/${userId}/${event}`)
        .once('value',snapshot => {
            var analytics = snapshot.val();
            console.log(analytics)
            if(analytics) {
                dispatch({type: `${event}_COUNT`, count: convertToArr(analytics).length})
            }
        })
    }
}


export const increaseCounter = (counterName, countUp) => {
    const userId = firebase.auth().currentUser.uid
    firebase.database().ref('users').child(userId).child(counterName).transaction(count => {
        return (count || 0) + countUp
    })    

}