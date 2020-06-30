export const getRecentlyViewedYoutube = () : [] => {
    const recentlySrc = localStorage.getItem('recently-viewed-youtube');
    return recentlySrc != null? JSON.parse(recentlySrc) : null; 
}


export const addReacentyViewedYoutubeVideo = (video:any) => {
    const recentlyViewed = getRecentlyViewedYoutube();
    if(video !=null) recentlyViewed.push(video);
    localStorage.setItem('recently-viewed-youtube', JSON.stringify(recentlyViewed))
}