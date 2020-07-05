import { Limitations, Participent, VirtualRoom } from "../types/virtual-room";
import { WorkoutComponent, WorkoutPlan } from "../types/workout-plan";
import { ImageDetails } from "../types/image-data";

export const UPDATE_VIRTUAL_ROOM_LIMITS = 'UPDATE_VIRTUAL_ROOM_LIMITS';
export const UPDATE_VIRTUAL_ROOM_DATA = 'UPDATE_VIRTUAL_ROOM_DATA';

export const ADD_WORKOUT_COMPONENT = 'ADD_WORKOUT_COMPONENT';
export const REPLACE_POSITION_ON_WORKOUT_PLAN = 'REPLACE_POSITION_ON_WORKOUT_PLAN';
export const REMOVE_WORKOUT_COMPONENT = 'REMOVE_WORKOUT_COMPONENT'; 
export const UPDATE_WORKOUT_COMPONENT = 'UPDATE_WORKOUT_COMPONENT';
export const SET_WORKOUT_COMPONENTS = 'SET_WORKOUT_COMPONENTS';

export const ADD_PARTICIPENT = 'ADD_WORKOUT_COMPONENT';

interface UpdateWorkoutLimitaionAction {
    type: typeof UPDATE_VIRTUAL_ROOM_LIMITS;
    payload: Limitations
}

export const updateWorkoutLimitation = (payload:any) => {
    return(dispatch:any) => {
        dispatch({type: UPDATE_VIRTUAL_ROOM_LIMITS, payload});
    }
}

//WorkoutPlan Actions
interface AddWorkoutComponentAction {
    type: typeof ADD_WORKOUT_COMPONENT;
    payload: WorkoutComponent;

}

export const addWorkoutCompnent = (update:WorkoutComponent) => {
    return(dispatch:(arg:AddWorkoutComponentAction) => (AddWorkoutComponentAction)) => {
        dispatch({type: ADD_WORKOUT_COMPONENT, payload:update});
    }
}


interface ReplacePositionOnWorkoutPlan {
    type: typeof REPLACE_POSITION_ON_WORKOUT_PLAN;
    payload: {source:number, target:number};
}

interface RemoveWorkoutComponentAction {
    type: typeof REMOVE_WORKOUT_COMPONENT;
    payload: number;

}

interface UpdateWorktouComponentAction{
    type: typeof UPDATE_WORKOUT_COMPONENT;
    payload: {index:number, update:WorkoutComponent};
}

export const updateWorkoutCompnent = (update:WorkoutComponent, index:number) => {
    return(dispatch:(arg:UpdateWorktouComponentAction) => (UpdateWorktouComponentAction)) => {
        dispatch({type: UPDATE_WORKOUT_COMPONENT, payload:{index,update}});
    }
}

interface SetWorkoutComponentsAction{
    type: typeof SET_WORKOUT_COMPONENTS;
    payload: WorkoutPlan;
}



//END WorkoutPlan Actions

interface AddParticipentAction {
    type: typeof ADD_PARTICIPENT;
    payload: Participent;
}

interface UpdateVirtualRoomData{
    type: typeof UPDATE_VIRTUAL_ROOM_DATA;
    payload: {
        roomName?: string;
        brandName?: string;
        roomId?: string;
        logo?: ImageDetails;
        createBy?: string;
        createAt?: number;
    };
}

export const keepChangesOnLocalStorage = (virtualRoom:VirtualRoom) => {
    localStorage.setItem('virtual-room', JSON.stringify(virtualRoom));
}

export const fetchChangesFromLocalStorage = () => {
    const virtualRoom = localStorage.getItem('virtual-room');
    return virtualRoom != null ? JSON.parse(virtualRoom) : null;
}

export type VirtualRoomActions =    UpdateWorkoutLimitaionAction | 
                                    AddWorkoutComponentAction |
                                    AddParticipentAction |
                                    UpdateVirtualRoomData |
                                    ReplacePositionOnWorkoutPlan | 
                                    RemoveWorkoutComponentAction |
                                    UpdateWorktouComponentAction |
                                    SetWorkoutComponentsAction;