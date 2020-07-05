import React from 'react';
import { FileDetails } from '../../types/file';
import { YoutubeDetails } from '../../types/youtube-data';
import { VideoDetails } from '../../types/video-data';
import { ImageDetails } from '../../types/image-data';
import YouTube from 'react-youtube';
import { generateUrlFromStoreate } from '../../actions/storage';

interface Props{
    file: FileDetails;
    className?: any ;
    id?: any;
    onRemove?: Function
}

export const FileElement = ({file,className = '',id = '', onRemove}:Props) => {    

    const fileSelector = () => {
        switch(file.type){
            case 'youtube':
                const f = (file as YoutubeDetails);
                return (<YouTube videoId={f.videoId}/>)
            case 'video':
                const f2 = (file as VideoDetails);
                return (<video controls src={generateUrlFromStoreate(f2.fullPath)}/>)
            case 'image':
                const f3 = (file as ImageDetails);
                return (<img src={generateUrlFromStoreate(f3.fullPath)} alt="img"/>)
        }
    }
    return(
        <div id={`${id}`} className={`file-element ${className}`}>
            {
                onRemove && <i className="fas fa-trash" onClick={() => onRemove()}></i>
            }
            {fileSelector()}
        </div>
    )
}