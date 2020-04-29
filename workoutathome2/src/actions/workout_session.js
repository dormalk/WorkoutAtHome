import firebase from 'firebase';
import { generateUniqKey } from '../helpers/fucntions';

export const isSessionExist = (sessionid) => {
    return firebase.database().ref(`session/${sessionid}`)
}

export const createNewSession = (session) => {
    return firebase.database().ref(`session/${session.sessionid}`)
    .set(session);
}

export const updateExistSession = (session) => {
    return firebase.database().ref(`session/${session.sessionid}`)
    .update(session);    
}

export const closeSession = (session) => {
    return firebase.database().ref(`completedSessions/${session.sessionid}`).set(session)
    .then(() => firebase.database().ref(`session/${session.sessionid}`).remove())
}

export const sendEvent = (sessionid,event, message) => {
    return firebase.database().ref(`session/${sessionid}/events`).update({id: generateUniqKey(8), code:event, body: {message}})
}
export const listenToSession = (sessionid) => {
    return firebase.database().ref(`session/${sessionid}/events`)
} 


