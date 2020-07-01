import * as firebase from 'firebase';

export const firebaseConfigs = {
    apiKey: "AIzaSyCd1PebiqmTnkiKEX2OsWzzMXpsARbWtrk",
    authDomain: "workoutathometest.firebaseapp.com",
    databaseURL: "https://workoutathometest.firebaseio.com",
    projectId: "workoutathometest",
    storageBucket: "workoutathometest.appspot.com",
    messagingSenderId: "140211779541",
    appId: "1:140211779541:web:572623ef1dd296ed3c6f5c",
    measurementId: "G-56JMWYVDK6"
}

export const initializedFirebase = firebase.initializeApp(firebaseConfigs);