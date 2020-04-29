const INITIAL_STATE = {
    list: [],
    filters: {
        type: [],
        duration: [],
        equipment: []
    }
}

export default (state = INITIAL_STATE, action) => {
    var { filters } = state;
    switch(action.type){
        case 'INSERT_VIDEO': 
            var {list} = state
            list.push(action.newVideo)
            return {
                ...state,
                list,
                loading: false
            }
        case 'FETCH_ALL':
            var {videos} = action;
            videos = videos.map(v=> {
                if(!v.clicks) v.clicks = 0;
                return v;
            })
            return {
                ...state,
                list: videos,
            }
        case 'UPDATE_FILTER':
            const {picked,param} = action;
            if(filters[param].includes(picked)) {
                filters[param] = filters[param].filter(t => t !== picked);
            } else {
                filters[param].push(picked)
            }
            return {
                ...state,
                filters
            }
        default:
            return state;
    }
}