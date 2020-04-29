const INITIAL_STATE = {
    leftNav: false,
    leftFilter: false,
    globalAlert: null
}

export default (state = INITIAL_STATE, action) => {
    var {leftNav} = state;
    switch(action.type){
        case 'TOGGEL_LEFT_NAV':
            return {
                ...state,
                leftNav: !leftNav
            } 
        case 'CLOSE_LEFT_NAV':
            return {
                ...state,
                leftNav: false
        } 
    
        case 'TOGGEL_LEFT_FILTER':
            var {leftFilter} = state;
            return {
                ...state,
                leftFilter: !leftFilter
            } 
        case 'SHOW_GLOBAL_ALERT':
            return {
                ...state,
                globalAlert: action.globalAlert
            }
        case 'HIDE_GLOBAL_ALERT':
            return {
                ...state,
                globalAlert: null
            }
    
       default:
            return state;
    }
}