import firebase from 'firebase';
import { analytics,increaseCounter } from './auth';
export const insertNewChallenge = (newChallenge) => {
    return(disptach) => {
        return firebase.database().ref('challenges/'+newChallenge.id).set(newChallenge)
        .then(() => {
            disptach({type: 'INSERT_NEW_CHALLENGE', newChallenge})
            analytics('createChallenges', {chellengeId: newChallenge.id, title:  newChallenge.title})
            increaseCounter('addChallengesCount', 1);
        })
    }
}



export const fetchAllChallenges = () => {
    return (disptach) => {
        return firebase.database().ref('challenges')
        .once('value',snapshot => {
            disptach({type:'INIT_ALL_CHALLENGES',challenges: snapshot.val()})
        })
    }
}



export const updateChallengesFilters = (picked,param) => {
    return(dispatch) => {
        dispatch({type: 'UPDATE_CHALLENGES_FILTER', picked,param})
    }
}


