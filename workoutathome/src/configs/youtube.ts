
import axios from 'axios';

export const youtubeConfigs = {
    KEY: "AIzaSyBI981yWGRixd6Dr0nCgJBYId28sIzq4BY",
    BASE_URL:  "https://www.googleapis.com/youtube/v3",    
    PART: "snippet,statistics,contentDetails"
}


export const getVideoDetailsById = (videoId:string) => {
    const {BASE_URL,KEY,PART} = youtubeConfigs;
    console.log(videoId);
    return axios.get(`${BASE_URL}/videos?key=${KEY}&part=${PART}&id=${videoId}`)
}

export const getVideoDetailsByUrl = (videoUrl:string) : Promise<any> => {
    return getVideoDetailsById(videoUrl.split('v=')[1])
}
