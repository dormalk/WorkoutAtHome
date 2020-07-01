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