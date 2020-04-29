const INITIAL_STATE = {
    uid: null,
    loading: false,
    challengesInProgress: [],
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
            return {
                ...state,
                ...action.user,
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
        case 'START_CHALLENGE':
            var {challengesInProgress} = state;
            challengesInProgress.push(action.challengeId)
            return{
                ...state,
                challengesInProgress
            }
        default:
            return state;
    }
}