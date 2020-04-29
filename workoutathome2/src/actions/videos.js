import * as firebase from 'firebase';
import {convertToArr} from '../helpers/fucntions';
export const isVideoExist = (videoId) => new Promise((resolve,reject) => {
    firebase.database().ref('videos/'+videoId)
    .once('value',snapshot => {
        console.log(snapshot.val())
        if(snapshot.val()) resolve()
        else reject();
    });

})


export const insertNewVideo = (newVideo) => {
    console.log(newVideo)
    return (dispatch) => {
        return firebase.database().ref('videos/'+newVideo.videoId).set(newVideo)
        .then(() => {
            dispatch({type: 'INSERT_VIDEO', newVideo})
        })
        .catch((err) => console.error(err))
    }
}


export const fetchAllVideos = () => {
    return(dispatch) => {
        firebase.database().ref('videos')
        .once('value',snapshot => {
            const data = snapshot.val();
            console.log(convertToArr(data));
            dispatch({type: 'FETCH_ALL', videos:convertToArr(data)})
        })
    }
}


export const updateSinglesFilters = (picked,param) => {
    return(dispatch) => {
        dispatch({type: 'UPDATE_FILTER', picked,param})
    }
}

