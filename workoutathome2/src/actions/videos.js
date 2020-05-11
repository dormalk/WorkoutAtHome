import * as firebase from 'firebase';
import {analytics,increaseCounter} from './auth';
import {convertToArr} from '../helpers/fucntions';
import axios from 'axios';

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
            analytics('AddVideos',{videoId: newVideo.videoId, title: newVideo.title})
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




export const updateVideoThumbnails =  (videoId) => {
    firebase.database().ref('videos_backup/'+videoId)
    .once('value', (snapshot) => {
        let video = snapshot.val();
        getVideoDetails(videoId)
        .then(({data}) => {
            if(data.items.length > 0){
                video = {
                    ...video,
                    allThumbnails: data.items[0].thumbnails || [],
                }
                firebase.database().ref('videos/'+videoId).update(video)
            }
        });
    })

} 


const KEY = "AIzaSyBVGMQU9KNm311Z-5b8jZJo8bnfQo_3i8U";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const part = "snippet,statistics,contentDetails";

const getVideoDetails = (videoId) => {
    console.log(videoId)
    return axios.get(`${BASE_URL}/videos?key=${KEY}&part=${part}&id=${videoId}`)
}

