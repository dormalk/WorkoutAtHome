import { createStore,combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userdata from '../reducers/auth';
import videodata from '../reducers/videos';
import system from '../reducers/system';
import challengedata from '../reducers/challenges';



const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;


export default () => {
    const store = createStore(
        combineReducers({userdata,videodata,challengedata,system}),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
}