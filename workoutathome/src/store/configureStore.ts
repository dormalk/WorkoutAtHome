import { createStore,combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/auth';
import { UserState } from '../types/user';


export default () => {
    const store = createStore(
        combineReducers({ authReducer }),
        compose(applyMiddleware(thunk))
    )
    return store;
}


export interface RootState{
    authstate: UserState
}