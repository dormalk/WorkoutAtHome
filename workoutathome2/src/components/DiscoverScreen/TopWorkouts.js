import React from 'react'

export default ({videos,userTypesPreference,onOpenSession}) => {
    const [topThree,setTopThree] =  React.useState([]) 
    const [pickedWorkout, setPickedWorkout] = React.useState(null);
    React.useEffect(() => {
        const top = videos.sort((v1,v2) => {
            if(userTypesPreference){
                const {first, second, third} = userTypesPreference;
                if(v2.type === first && v2.type === first){
                    return v2.clicks-v1.clicks
                } else if(v2.type === first && v2.type !== first) {
                    return 1;
                } else if(v2.type === second && v2.type === second) {
                    return v2.clicks-v1.clicks
                } else if (v2.type === second && v2.type === third) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return v2.clicks-v1.clicks        
            }
        });
        setTopThree(top)
        setPickedWorkout(top[0]);
    
    },[userTypesPreference])

    return (
        <div className="tabbable tabs-vertical tabs-right-lg">

        <ul className="nav nav-tabs">
        {
            topThree.map((video,index) => {
                return (
                    index < 5 &&
                    <li className={pickedWorkout.videoId === video.videoId? 'active' : '' } 
                        key={index}
                        onClick={() => setPickedWorkout(video)}>
                        <a data-toggle="tab">
                        <i className="fa fa-fw icon-music-note-2"></i> 
                        {video.title.substring(0, 10)}...</a></li>
                )
            })
        }
        </ul>
        <div className="tab-content">
        <div id="music-cover-1" className="tab-pane active">
            {
                pickedWorkout && 
                <div    className="cover overlay height-320-lg cover-image-full" 
                        style={{cursor: 'pointer'}}
                        onClick={() => onOpenSession(pickedWorkout.videoId)}>
                <div className="overlay overlay-bg-black">
                    <h3 className="text-h3 text-overlay margin-top-none">
                    {pickedWorkout.title}
                    <span className="text-h5">
                    <span className="fa fa-fw fa-star text-primary"></span>
                    <span className="fa fa-fw fa-star text-primary"></span>
                    <span className="fa fa-fw fa-star text-primary"></span>
                    </span>
                    </h3>

                </div>            
                <img src={`https://i.ytimg.com/vi/${pickedWorkout.videoId}/maxresdefault.jpg`} alt="cover"  onError={(e)=>{e.target.onerror = null; e.target.src="image_path_here"}}/>
                </div>
                }
          </div>
        </div>

      </div>

    )
}