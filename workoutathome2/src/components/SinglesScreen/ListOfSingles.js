/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {SingleWorkoutCard} from '../Commons/SingleWorkoutCard';
export default ({videoList,onOpenSession}) => {
    return (
        <div>
            <h2>Single Workouts</h2>
            <div className="row gridalicious" data-toggle="gridalicious" data-width="200" id="workouts">
                {
                    videoList && videoList.map(video => 
                        <SingleWorkoutCard  onClick={(videoId) => onOpenSession(videoId)} 
                                            key={video.id}
                                            inline={true} 
                                            video={video}/>)
                }
            </div>
              
        </div>
    )
}