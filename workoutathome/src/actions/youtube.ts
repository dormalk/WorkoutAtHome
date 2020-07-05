import { YoutubeDetails } from "../types/youtube-data";

export const getRecentlyViewedYoutube = () : [] => {
    var recentlySrc = localStorage.getItem('recently-viewed-youtube');
    return recentlySrc != null? JSON.parse(recentlySrc).map((item:any) => {
        item.type = 'youtube';
        return item;
    }) : []; 
}


export const addReacentyViewedYoutubeVideo = (video:any) => {
    const recentlyViewed : any[] = getRecentlyViewedYoutube();
    if(video !=null) recentlyViewed.push(video);
    localStorage.setItem('recently-viewed-youtube', JSON.stringify(recentlyViewed))
}

export const deleteRecentlyViewedYoutubeVideo = (videoId:string) => {
    var recentlyViewed : YoutubeDetails[] = getRecentlyViewedYoutube();
    if(videoId != null) recentlyViewed = recentlyViewed.filter(v => v.videoId !== videoId);
    localStorage.setItem('recently-viewed-youtube', JSON.stringify(recentlyViewed))
}