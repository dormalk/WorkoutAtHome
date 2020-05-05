import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/styles.scss';

import App from './App';
// import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth'; 
import { fetchAllVideos } from './actions/videos'; 
import { fetchAllChallenges } from './actions/challenges';
import { initializedFirebaseApp } from './configs/firebase';


const store = configureStore();
const jsx = (
    <Provider store={store}>
        <App/>
    </Provider>
)
store.dispatch({type:'IN_LOAD'});

const unsubscribe = store.subscribe(()=> {
    if(!store.getState().userdata.loading){
        Promise.all([
            store.dispatch(fetchAllVideos()),
            store.dispatch(fetchAllChallenges())
        ]).then(() => {
            ReactDOM.render(jsx, document.getElementById('root'));
            unsubscribe();
        })
    }
})


ReactDOM.render(<div id="loader">Loading...</div>, document.getElementById('root'));


initializedFirebaseApp.auth().onAuthStateChanged(user => {
    if(user) store.dispatch(login(user.uid))
    else store.dispatch(logout())
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

