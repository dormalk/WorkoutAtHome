import firebase from 'firebase';


export const addLogEvent = (eventName, body) => {
    firebase.analytics().logEvent(eventName, body)
}