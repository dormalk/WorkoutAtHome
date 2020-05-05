const INITIAL_STATE = {
    uid: null,
    loading: false,
    challengesInProgress: [],
    signedChallenges: [],
    frineds: [],
    friendsCount: 0,
    workoutsCount: 0,
    challengeCount: 0,
    addVideosCount: 0,
    addChallengesCount: 0,
    preference: {
        calcTypes: {
            first: '',
            second: '',
            third: ''
        }
    }
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN': 
        case 'UPDATE_USER':
            const { challengesInProgress } = action.user;
            var signedChallenges =  challengesInProgress? challengesInProgress.map((ch) => ch.challengeId) : [];
            return {
                ...state,
                ...action.user,
                signedChallenges,
                loading: false
            }
        case 'LOGOUT':
            return {
                ...INITIAL_STATE,
            }
        case 'IN_LOAD':
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}