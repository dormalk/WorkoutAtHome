import { VirtualRoom, Participent } from "../types/virtual-room";
import { VirtualRoomActions, UPDATE_VIRTUAL_ROOM_LIMITS, ADD_WORKOUT_COMPONENT, ADD_PARTICIPENT, UPDATE_VIRTUAL_ROOM_DATA, REPLACE_POSITION_ON_WORKOUT_PLAN, REMOVE_WORKOUT_COMPONENT, UPDATE_WORKOUT_COMPONENT, SET_WORKOUT_COMPONENTS, keepChangesOnLocalStorage } from "../actions/virtual-room";
import { WorkoutComponent } from "../types/workout-plan";
import { generateUniqKey } from "../helpers/functions";

const INITIAL_STATE : VirtualRoom = {
    roomName: '',
    roomId: generateUniqKey(8),
    brandName: '',
    createBy: '',
    createAt: new Date().getTime(),
    participents: [],
    workoutPlan: {
        components: []
    }
}


export function virtualRoomReducer(
    state = INITIAL_STATE,
    action: VirtualRoomActions
) : VirtualRoom {
    var {participents,workoutPlan} = state;
    var components = workoutPlan.components.slice();

    switch(action.type){
        case UPDATE_VIRTUAL_ROOM_LIMITS:
            return {
                ...state,
                limitations: action.payload
            }
        case ADD_WORKOUT_COMPONENT:
            workoutPlan.components = [...workoutPlan.components, (action.payload as WorkoutComponent)];
            return {
                ...state,
                workoutPlan
            }
        case REMOVE_WORKOUT_COMPONENT:
            workoutPlan.components = workoutPlan.components.filter((v,i) => i !== action.payload);
            return{
                ...state,
                workoutPlan
            }
        case UPDATE_WORKOUT_COMPONENT:

            components[action.payload.index] = {
                ...components[action.payload.index],
                ...action.payload.update
            }
            workoutPlan.components = components;
            keepChangesOnLocalStorage({
                ...state,
                workoutPlan
            });
            return {
                ...state,
                workoutPlan
            }
        case SET_WORKOUT_COMPONENTS:
            return {
                ...state,
                workoutPlan: action.payload
            }
        case ADD_PARTICIPENT:
            participents = [...participents, (action.payload as Participent)] 
            return {
                ...state,
                participents
            }
        case UPDATE_VIRTUAL_ROOM_DATA:
            return{
                ...state,
                ...action.payload
            }
        case REPLACE_POSITION_ON_WORKOUT_PLAN:
            const elem1 = workoutPlan.components[action.payload.source];
            const elem2 = workoutPlan.components[action.payload.target];
            components[action.payload.source] = elem2;
            components[action.payload.target] = elem1;
            workoutPlan.components = components;
            return {
                ...state,
                workoutPlan
            }
        default:
            return {
                ...state
            }
    }
}