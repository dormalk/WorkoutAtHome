import { createStore,combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/auth';
import {virtualRoomReducer} from '../reducers/virtual-room';
import { UserState } from '../types/user';
import { VirtualRoom } from '../types/virtual-room';
import { localStorageMiddleWare } from './localstorage-middleware';


export default () => {
    const store = createStore(
        combineReducers({ 
            authstate:authReducer,
            virtualroomstate:virtualRoomReducer }),
        compose(applyMiddleware(thunk,localStorageMiddleWare))
    )
    return store;
}



export interface RootState{
    authstate: UserState,
    virtualroomstate: VirtualRoom
}