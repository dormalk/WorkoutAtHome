import * as firebase from 'firebase';
import {analytics,increaseCounter} from './auth';
import {convertToArr} from '../helpers/fucntions';


export const isVideoExist = (videoId) => new Promise((resolve,reject) => {
    firebase.database().ref('videos/'+videoId)
    .once('value',snapshot => {
        if(snapshot.val()) resolve()
        else reject();
    });

})


export const insertNewVideo = (newVideo) => {
    return (dispatch) => {
        const userId = firebase.auth().currentUser.uid
        newVideo.createBy = userId || null; 
        return firebase.database().ref('videos/'+newVideo.videoId).set(newVideo)
        .then(() => {
            dispatch({type: 'INSERT_VIDEO', newVideo})
            analytics('AddVideos',{videoId: newVideo.videoId})
            increaseCounter('addVideosCount',1);
        })
        .catch((err) => console.error(err))
    }
}


export const fetchAllVideos = () => {
    return(dispatch) => {
        return firebase.database().ref('videos')
        .once('value',snapshot => {
            const data = snapshot.val();
            dispatch({type: 'FETCH_ALL', videos:convertToArr(data)})
        })
    }
}


export const updateSinglesFilters = (picked,param) => {
    return(dispatch) => {
        dispatch({type: 'UPDATE_FILTER', picked,param})
    }
}

