import * as firebase from 'firebase';
import {analytics,increaseCounter} from './auth';
import {categories,workoutDurations} from '../configs/videoParams';


export const insertNewVideo = (newVideo) => 
    new Promise((resolve,reject) => {
        const userId = firebase.auth().currentUser.uid;
        newVideo.createBy = userId || null;    
        firebase.firestore().collection('videos')
        .doc(newVideo.videoId)
        .set(newVideo)
        .then(() => {
            analytics('AddVideos',{videoId: newVideo.videoId, title: newVideo.title})
            increaseCounter('addVideosCount',1);

        })
        .catch((err) => console.error(err));
})

export const getVideoById = (videoId) =>
    new Promise((resolve,reject) => {
        firebase.firestore().collection('videos')
        .doc(videoId)
        .get()
        .then((snapshot) => {
            if(snapshot.exists) resolve(snapshot.data());
            else reject({error: 'Not found'})
        })
    })


const LIMIT = window.innerWidth <= 480? 7 : 15;
var last_doc = null;
export const getVideosCategoriesNext = (
    categories2 = categories.map((category) => category.label), 
    duration = workoutDurations.map(d => d.api),
    limit = LIMIT) =>
    new Promise((resolve,reject) => {
        if(last_doc === undefined) resolve({data:[]})
        firebase.firestore()
        .collection('videos')
        .where('type','in',categories2)
        .where('length', 'in', duration)
        .orderBy('clicks', 'desc')
        .startAfter(last_doc)
        .limit(limit)
        .get()
        .then((docSnapshots) => {
            resolve(handleSnapshotData(docSnapshots));
        })
    })


    export const getVideosCategories = (
        categories2 = categories.map((category) => category.label), 
        duration = workoutDurations.map(d => d.api),
        limit = LIMIT) =>
    new Promise((resolve,reject) => {
        console.log(duration)
        firebase.firestore()
        .collection('videos')
        .where('type','in',categories2)
        .where('length','in',duration)
        .orderBy('clicks', 'desc')
        .limit(limit)
        .get()
        .then((docSnapshots) => {
            resolve(handleSnapshotData(docSnapshots));
        })
    })

const handleSnapshotData = (docSnapshots) => {
    if(!docSnapshots.empty){
        var videos = [];
        last_doc = docSnapshots.docs[docSnapshots.docs.length - 1];
        docSnapshots.forEach((snapshot) => videos.push(snapshot.data()))
        return({data: videos})
    } else {
        return({data: []})
    }
}

