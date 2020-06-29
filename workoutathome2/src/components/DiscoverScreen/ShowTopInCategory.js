import React from 'react';
import {SingleWorkoutCard} from '../Commons';
export default ({title, videos, onShowMore}) => {
    
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 style={{float: 'left'}}>{title}</h3>
                <button className="btn btn-primary" style={{float: 'right'}} onClick={() => onShowMore()}>Show More...</button>
                <div style={{clear: 'both'}}></div>
            </div>
            <div className="panel-body">
                <div id="workouts" className="topcategories">
                        {
                            videos.map((v,index) => <SingleWorkoutCard  video={v} 
                                                                        key={index} 
                                                                        inline={true}
                                                                        onClick={() => console.log('click')}/>)
                        }
                </div>
            </div>
        </div>
    )
}