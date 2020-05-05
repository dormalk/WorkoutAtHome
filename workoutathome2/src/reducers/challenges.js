import {convertToArr} from '../helpers/fucntions'
import { getTagTypes, getDurationAvg } from '../utils/challenge';

const INITIAL_STATE = {
    list: [],
    filters: {
        type: [],
        duration: [],
    }
};


export default (state=INITIAL_STATE, action) => {
    var {filters} = state;
    switch(action.type){
        case 'INSERT_NEW_CHALLENGE':
            var updatedList = state.list;
            var {newChallenge} = action;
            newChallenge.tagTypes = getTagTypes(newChallenge);
            newChallenge.avgDuration = getDurationAvg(newChallenge)
            newChallenge.thumbnails = `https://i.ytimg.com/vi/${newChallenge.days[0][0].id}/maxresdefault.jpg`;
            updatedList.push(action.newChallenge)
            return {
                ...state,
                list: updatedList
            }
        case 'INIT_ALL_CHALLENGES':
            var convertedList = convertToArr(action.challenges);
            convertedList = convertedList.map(challenge => {
                challenge.tagTypes = getTagTypes(challenge);
                challenge.avgDuration = getDurationAvg(challenge)
                challenge.thumbnails = `https://i.ytimg.com/vi/${challenge.days[0][0].id}/maxresdefault.jpg`;
                return challenge;
            })
            return {
                ...state,
                list: convertedList
            }
        case 'UPDATE_CHALLENGES_FILTER':
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