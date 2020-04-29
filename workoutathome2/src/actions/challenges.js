import firebase from 'firebase';

export const insertNewChallenge = (newChallenge) => {
    return(disptach) => {
        return firebase.database().ref('challenges/'+newChallenge.id).set(newChallenge)
        .then(() => disptach({type: 'INSERT_NEW_CHALLENGE', newChallenge}))
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


export const userStartChallenge = (challengeId) => {
    const currentUser = firebase.auth().currentUser;
    if(currentUser){
        return(disptach) => {
            return firebase.database().ref(`users/${currentUser.uid}/challengesInProgress`)
            .transaction(challengesInProgress => {
                challengesInProgress.push(challengeId);
                return challengesInProgress;
            })
            .then(() => {
                disptach({type: 'START_CHALLENGE', challengeId})
            })
        }
    } else {
        return null;
    }
}


export const updateChallengesFilters = (picked,param) => {
    return(dispatch) => {
        dispatch({type: 'UPDATE_CHALLENGES_FILTER', picked,param})
    }
}


// export const userCompleteChallenge = () => {
//     const currentUser = firebase.auth().currentUser;
//     if(currentUser){
//         return(disptach) => {
//             return firebase.database().ref(`users/${currentUser.uid}/challengesInProgress`)
//         }
//     } else {
//         return null;
//     }
// }