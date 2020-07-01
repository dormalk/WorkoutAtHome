import React from 'react';
import { LightBox } from './LightBox';
import { getVideoDetailsByUrl } from '../../../configs/youtube';
import YouTube from 'react-youtube';
import { getRecentlyViewedYoutube, addReacentyViewedYoutubeVideo } from '../../../actions/youtube';
import { YoutubeDetails } from '../../../types/youtube-data';
import { uploadFileToStorage, getFilesFromStorage, generateUrlFromStoreate } from '../../../actions/storage';
import { VideoDetails } from '../../../types/video-data';
import { FileDetails } from '../../../types/file';
import { ImageDetails } from '../../../types/image-data';

interface Props {
    label: string;
    onPick: Function;
}

export const FilePicker = (props:Props) => {
    const [showLightbox, setShowLightbox] = React.useState(false);
    return(
        <React.Fragment>
            {
                showLightbox &&    
                <LightBox  title="Choose File"
                            onClose={() => setShowLightbox(false)}>
                        <FilePickerContent/>
                </LightBox>
            }
            <button className="btn btn-primary" onClick={() => setShowLightbox(true)}>{props.label}</button>
        </React.Fragment>
    )
}


const FilePickerContent: Function = () : JSX.Element => {
    const [pickedTab, setPickedTab] = React.useState('Youtube');
    const [pickedFile, setPickedFile] = React.useState<any | null>(null);

    return (
        <div className="file-picker">
            <div className="file-picker_header">
                <FilePickerTab  onPick={(label:string) => setPickedTab(label)}
                                pickedTab={pickedTab}/>

                {
                    pickedFile&&
                    <div className="button-box">
                        <button className="btn btn-green">Reset</button>
                        <button className="btn btn-danger">Delete</button>
                        <button className="btn btn-primary">Pick</button>
                    </div>
                }
            </div>
            {
                pickedTab === 'Youtube' && <YouTubePicker onPick={(file:FileDetails) => setPickedFile(file)}/>
            }
            {
                pickedTab === 'Videos' && <VideoPicker onPick={(file:FileDetails) => setPickedFile(file)}/>
            }
            {
                pickedTab === 'Images' && <ImagePicker onPick={(file:FileDetails) => setPickedFile(file)}/>
            }
            
        </div>
    )
}

const FilePickerTab = ({pickedTab, onPick} : {pickedTab:string; onPick: Function}) => {
    const isActive = (tab_label:string) =>{
        return pickedTab === tab_label;
    }

    const tabs = [
        {
            label: 'Youtube',
            icon: 'fab fa-youtube',
            color: isActive('Youtube')? 'red' : ''
        },
        {
            label: 'Videos',
            icon: 'far fa-file-video',
            color: isActive('Videos')? 'blue' : ''
        },
        {
            label: 'Images',
            icon: 'far fa-images',
            color: isActive('Images')? 'green' : ''
        }
    ]

    return(
        <div className="file-picker_tabs">
            <ul className="row" style={{justifyContent: 'flex-start'}}>
                {
                    tabs.map(tab => 
                        <li     className={`tab ${isActive(tab.label)? 'is-active':''}`}
                                style={{color:tab.color}}
                                key={tab.label}
                                onClick={() => onPick(tab.label)}>
                            <i className={tab.icon}></i>  {tab.label}
                        </li>)
                }
            </ul>
        </div>    
    )
}

interface PickerProps {
    onPick: Function;
}

const YouTubePicker = (props: PickerProps) => {

    const [recentlyViewed, setRecentlyViewed] = React.useState<any>([]);
    const [youtubeUrl, setYoutubeUrl] = React.useState('');
    const [youtubeShow, setYoutubeShow] = React.useState<any>(null);
    const inputEl = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const inputRefCurrent = inputEl.current;
        if(inputRefCurrent != null) inputRefCurrent.focus();
        const recentlyViewed = getRecentlyViewedYoutube();
        setRecentlyViewed(recentlyViewed);
        if(youtubeShow!=null) props.onPick(youtubeShow);
        return(() => props.onPick(null))
    },[inputEl,youtubeShow,props])

    const handleUrlInputChange = (videoUrl:string) => {
        setYoutubeUrl(videoUrl)
        if(videoUrl.length > 10){
            getVideoDetailsByUrl(videoUrl)
            .then(res => {                
                const youtube_data = {...res.data.items[0].snippet, videoId:res.data.items[0].id};
                if(!recentlyViewed.find((v:any) => v.videoId === youtube_data.videoId)){
                    addReacentyViewedYoutubeVideo(youtube_data);
                    setRecentlyViewed([...recentlyViewed,youtube_data])
                }
                setYoutubeShow(youtube_data);
            })
            .catch(err => setYoutubeShow(null))
        }
    }

    return(
        <div className="youtube-picker">
            <div className={`container-picker ${youtubeShow != null? 'row-layout':''}`}> 
                <div className={`recently-view ${recentlyViewed.length > 0 ? 'hide-background':''}`}>
                    {
                        recentlyViewed.length === 0?
                        (
                            <React.Fragment>
                                {/* <img src="/assets/svg/youtube.svg" alt="no-recently-view"/> */}
                                <p>
                                    Hi trainer,<br/>
                                    for the first search please set the Youtube url <br/>
                                    you want to choose in the input field above
                                </p>
                            </React.Fragment>
                        ):(
                            recentlyViewed.map((video:YoutubeDetails,index:number) => 
                            <FilePickerCard video={video} 
                                            key={index}
                                            onClick={(video:YoutubeDetails) => setYoutubeShow(video)}/>)
                        )
                    }
                </div>
                {
                    youtubeShow != null &&
                    <YouTube videoId={youtubeShow.videoId}/>
                }

            </div>

            <input  type="text" 
                    value={youtubeUrl} 
                    ref={inputEl}
                    className="form-control" 
                    placeholder="Youtube URL" 
                    onChange={(event) => handleUrlInputChange(event.target.value)}/>
        </div>
    )
}

const VideoPicker = (props: PickerProps) => {

    const [videoToShow, setVideoToShow] = React.useState<any>(null);
    const inputEl = React.useRef<HTMLInputElement>(null);
    const [recentlyViewed, setRecentlyViewed] = React.useState<any>([]);

    React.useEffect(() => {
        const inputRefCurrent = inputEl.current;
        if(inputRefCurrent != null) inputRefCurrent.focus();
        getFilesFromStorage('videos')
        .then((res) => {
            setRecentlyViewed(res)
        })
        if(videoToShow!=null) props.onPick(videoToShow);
        return(() => props.onPick(null))
    },[inputEl,videoToShow,props])


    const handlePickFile = (file:any) => {
        uploadFileToStorage('videos',file[0])
        .then((res:any) => {
            setVideoToShow(res)
        })
        .catch(err => console.error(err.message))
    }

    return(
        <div className="video-picker">
            <div className={`container-picker ${videoToShow != null? 'row-layout':''}`}> 
                <div className={`recently-view ${recentlyViewed.length > 0 ? 'hide-background':''}`}>
                    {
                        recentlyViewed.length === 0?
                        (
                            <React.Fragment>
                                <p>
                                    Hi trainer,<br/>
                                    for the first research please set the Youtube url <br/>
                                    you want to choose in the input field above
                                </p>
                            </React.Fragment>
                        ):(
                            recentlyViewed.map((video:VideoDetails,index:number) => 
                            <FilePickerCard video={video} 
                                            key={index}
                                            onClick={(video:VideoDetails) => setVideoToShow(video)}/>)
                        )
                    }
                </div>
                {
                    videoToShow != null && 
                    <div className="video-show">
                        <video controls src={generateUrlFromStoreate(videoToShow.fullPath)} />
                    </div>
                }

            </div>

            <input  type="file" 
                    ref={inputEl}
                    className="form-control" 
                    placeholder="Youtube URL" 
                    onChange={(event) => handlePickFile(event.target.files)}/>
        </div>
    )
}

const ImagePicker = (props: PickerProps) => {
    const [imageToShow, setImageToShow] = React.useState<any>(null);
    const inputEl = React.useRef<HTMLInputElement>(null);
    const [recentlyViewed, setRecentlyViewed] = React.useState<any>([]);

    React.useEffect(() => {
        const inputRefCurrent = inputEl.current;
        if(inputRefCurrent != null) inputRefCurrent.focus();
        getFilesFromStorage('images')
        .then((res) => {
            setRecentlyViewed(res)
        })
        if(imageToShow!=null) props.onPick(imageToShow);
        return(() => props.onPick(null))
    },[inputEl,imageToShow,props])


    const handlePickFile = (file:any) => {
        uploadFileToStorage('images',file[0])
        .then((res:any) => {
            setImageToShow(res)
        })
        .catch(err => console.error(err.message))
    }

    return(
        <div className="img-picker">
            <div className={`container-picker ${imageToShow != null? 'row-layout':''}`}> 
                <div className={`recently-view ${recentlyViewed.length > 0 ? 'hide-background':''}`}>
                    {
                        recentlyViewed.length === 0?
                        (
                            <React.Fragment>
                                <p>
                                    Hi trainer,<br/>
                                    for the first research please set the Youtube url <br/>
                                    you want to choose in the input field above
                                </p>
                            </React.Fragment>
                        ):(
                            recentlyViewed.map((video:ImageDetails,index:number) => 
                            <FilePickerCard video={video} 
                                            key={index}
                                            onClick={(video:ImageDetails) => setImageToShow(video)}/>)
                        )
                    }
                </div>
                {
                    imageToShow != null && 
                    <div className="img-show">
                        <img src={generateUrlFromStoreate(imageToShow.fullPath)} alt="img-show" />
                    </div>
                }

            </div>

            <input  type="file" 
                    ref={inputEl}
                    className="form-control" 
                    placeholder="Youtube URL" 
                    onChange={(event) => handlePickFile(event.target.files)}/>
        </div>
    ) 
}

const FilePickerCard = (props : {video: FileDetails, onClick:Function}) => {
    const getVideoThumbnails = (thumbnails:any):string =>{
        if(thumbnails.maxres) return thumbnails.maxres.url;
        else if(thumbnails.high) return thumbnails.high.url;
        else return thumbnails.default.url;
    }


    return(
        <div className="file-picker_card" onClick={() => props.onClick(props.video)}>
            <div className="img-cover">
                {   
                    props.video.type === 'youtube' &&
                    <img src={getVideoThumbnails((props.video as YoutubeDetails).thumbnails)} alt="img-cover"/>
                }
                {   
                    props.video.type === 'video' &&
                    <video src={generateUrlFromStoreate((props.video as VideoDetails).fullPath)}></video>
                }
                {
                    props.video.type === 'image' &&
                    <img src={generateUrlFromStoreate((props.video as ImageDetails).fullPath)} alt="img-cover"/>
                }

            </div>
            <div className="card-label">

                {
                    props.video.type === 'youtube' &&
                    (props.video as YoutubeDetails).title
                }
                {
                    (props.video.type === 'video' || props.video.type === 'image') &&
                    (props.video as VideoDetails).name
                    
                }
            </div>
        </div>
    )
}