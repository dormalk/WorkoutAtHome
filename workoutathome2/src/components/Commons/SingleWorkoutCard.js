import React from 'react';
import {convertDurationToString} from '../../utils/video';

export const SingleWorkoutCard = ({video, onClick, inline}) => {
    const getVideoImage = () => {
        if(!video.allThumbnails) return video.thumbnails; 
        if(video.allThumbnails.standard) return video.allThumbnails.standard.url;
        else if(video.allThumbnails.default) return video.allThumbnails.default.url;
        return video.thumbnails;
    }

    return(
        <div className={`panel panel-default ${inline? 'inline': ''}`} key={video.id}  onClick={() => onClick(video.id)} style={{cursor: 'pointer'}}>
            <div className="cover overlay hover cover-image-full" style={{height: 'unset'}}>
                <img src={getVideoImage()} alt="music" className="pull-left" style={{height: '200px', width:'auto'}}/>
                <div className="overlay overlay-full overlay-hover overlay-bg-black">
                    <div className="v-center">
                        <a className="btn btn-lg btn-circle btn-white"><i className="fa fa-play"></i></a>
                    </div>
                </div>
            </div>
            <div className="panel-body">
                <h4 className="margin-none title"><a>{video.title}</a></h4>
                <span className="text-grey-500">{video.type}</span><br/>
                <span className="text-grey-500">{convertDurationToString(video.duration)}</span>
            </div>
        </div>

    )
}