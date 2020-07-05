import React from 'react';
import { LightBox } from './LightBox';
import { getVideoDetailsByUrl } from '../../configs/youtube';
import YouTube from 'react-youtube';
import { getRecentlyViewedYoutube, addReacentyViewedYoutubeVideo, deleteRecentlyViewedYoutubeVideo } from '../../actions/youtube';
import { YoutubeDetails } from '../../types/youtube-data';
import { uploadFileToStorage, getFilesFromStorage, generateUrlFromStoreate, deleteFileFromStorage } from '../../actions/storage';
import { VideoDetails } from '../../types/video-data';
import { FileDetails } from '../../types/file';
import { ImageDetails } from '../../types/image-data';

interface Props {
    label: string;
    onPick: Function;
    tabToShow: string[]
}

export const FilePicker = (props:Props) => {
    const [showLightbox, setShowLightbox] = React.useState(false);
    return(
        <React.Fragment>
            {
                showLightbox &&    
                <LightBox  title="Choose File"
                            onClose={() => setShowLightbox(false)}>
                        <FilePickerContent onPick={(file:FileDetails)=> {
                                                setShowLightbox(false)
                                                props.onPick(file)
                                            }}
                                            tabToShow={props.tabToShow}/>
                </LightBox>
            }
            <button className="btn btn-primary-lite" onClick={() => setShowLightbox(true)}>{props.label}</button>
        </React.Fragment>
    )
}


const FilePickerContent: Function = ({onPick,tabToShow}:{onPick:Function, tabToShow: string[]}) : JSX.Element => {
    const [pickedTab, setPickedTab] = React.useState(tabToShow[0]);
    const [pickedFile, setPickedFile] = React.useState<FileDetails | any>(null);

    return (
        <div className="file-picker">
            <div className="file-picker_header">
                <FilePickerTab  onPick={(label:string) => {
                                    setPickedTab(label)
                                    setPickedFile(null)
                                }}
                                tabToShow={tabToShow}
                                pickedTab={pickedTab}
                                className={`${pickedFile? 'hide-mobile':''}`}/>

                {
                    pickedFile&&
                    <div className="button-box">
                        <button className="btn btn-primary" onClick={() => onPick(pickedFile)}>Pick</button>
                        <button className="btn btn-danger" onClick={() => {
                            if(pickedFile.type === 'youtube'){
                                deleteRecentlyViewedYoutubeVideo((pickedFile as YoutubeDetails).videoId)
                                setPickedFile(null)
                            } else {
                                deleteFileFromStorage((pickedFile as VideoDetails).fullPath)
                                .finally(() => setPickedFile(null))
                            }
                        }}>Delete</button>
                        <button className="btn btn-green" onClick={() => setPickedFile(null)}>Reset</button>
                    </div>
                }
            </div>
            {
                pickedTab === 'Youtube' && <YouTubePicker onPick={(file:FileDetails) => setPickedFile(file)} fileShow={pickedFile}/>
            }
            {
                pickedTab === 'Videos' && <VideoPicker onPick={(file:FileDetails) => setPickedFile(file)} fileShow={pickedFile}/>
            }
            {
                pickedTab === 'Images' && <ImagePicker onPick={(file:FileDetails) => setPickedFile(file)} fileShow={pickedFile}/>
            }
            
        </div>
    )
}

const FilePickerTab = ({pickedTab, onPick,className,tabToShow} : {pickedTab:string; onPick: Function,className:any,tabToShow:string[]}) => {
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
        <div className={`file-picker_tabs ${className}`}>
            <ul className="row" style={{justifyContent: 'flex-start'}}>
                {
                    tabs.map(tab => 
                        tabToShow.includes(tab.label)?<li     className={`tab ${isActive(tab.label)? 'is-active':''}`}
                                style={{color:tab.color}}
                                key={tab.label}
                                onClick={() => onPick(tab.label)}>
                            <i className={tab.icon}></i>  {tab.label}
                        </li>:null)
                }
            </ul>
        </div>    
    )
}

interface PickerProps {
    onPick: Function;
    fileShow: FileDetails;
}

const YouTubePicker = (props: PickerProps) => {
    const [recentlyViewed, setRecentlyViewed] = React.useState<any>([]);
    const [youtubeUrl, setYoutubeUrl] = React.useState('');
    const [youtubeShow,setYoutubeShow] = React.useState<any>(props.fileShow);
    const inputEl = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const inputRefCurrent = inputEl.current;
        if(inputRefCurrent != null) inputRefCurrent.focus();
        const recentlyViewed = getRecentlyViewedYoutube();
        setRecentlyViewed(recentlyViewed);
        if(props.fileShow !== youtubeShow) setYoutubeShow(props.fileShow);
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
                props.onPick(youtube_data);
            })
            .catch(err => props.onPick(null))
        }
    }

    return(
        <div className="youtube-picker" inner-picker="true">
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
                                            onClick={(video:YoutubeDetails) => props.onPick(video)}/>)
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

    const [videoToShow, setVideoToShow] = React.useState<any>(props.fileShow);
    const inputEl = React.useRef<HTMLInputElement>(null);
    const [recentlyViewed, setRecentlyViewed] = React.useState<any>([]);

    React.useEffect(() => {
        const inputRefCurrent = inputEl.current;
        if(inputRefCurrent != null) inputRefCurrent.focus();
        getFilesFromStorage('videos')
        .then((res:any) => {
            setRecentlyViewed(res)
        })
        if(videoToShow !==props.fileShow) setVideoToShow(props.fileShow);
    },[inputEl,videoToShow,props])


    const handlePickFile = (file:any) => {
        uploadFileToStorage('videos',file[0])
        .then((res:any) => {
            props.onPick(res)
        })
        .catch(err => console.error(err.message))
    }

    return(
        <div className="video-picker" inner-picker="true">
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
                                            onClick={(video:VideoDetails) => props.onPick(video)}/>)
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
        .then((res:any) => {
            setRecentlyViewed(res)
        })
        if(imageToShow !== props.fileShow) setImageToShow(props.fileShow);
    },[inputEl,imageToShow,props])


    const handlePickFile = (file:any) => {
        uploadFileToStorage('images',file[0])
        .then((res:any) => {
            props.onPick(res)
        })
        .catch(err => console.error(err.message))
    }

    return(
        <div className="img-picker" inner-picker="true">
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
                                            onClick={(video:ImageDetails) => props.onPick(video)}/>)
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
        <div className="file-picker_card" onClick={() => {
            if(props.video.type !== 'youtube'){
                var pickedFile : VideoDetails = {
                    fullPath: (props.video as VideoDetails).fullPath,
                    name: (props.video as VideoDetails).name,
                    type: props.video.type
                }
                props.onClick(pickedFile)
            } else {
                props.onClick(props.video)
            }
        }}>
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