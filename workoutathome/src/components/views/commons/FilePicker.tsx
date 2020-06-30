import React from 'react';
import { LightBox } from './LightBox';
import { getVideoDetailsByUrl } from '../../../configs/youtube';
import YouTube from 'react-youtube';

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
    return (
        <div className="file-picker">
            <FilePickerTab  onPick={(label:string) => setPickedTab(label)}
                            pickedTab={pickedTab}/>
            <YouTubePicker/>
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


const YouTubePicker = () => {

    const [recentlyViewed, setRecentlyViewed] = React.useState([]);
    const [youtubeUrl, setYoutubeUrl] = React.useState('');
    const [youtubeShow, setYoutubeShow] = React.useState<any>(null);
    const inputEl = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const inputRefCurrent = inputEl.current;
        if(inputRefCurrent != null) inputRefCurrent.focus();

    },[inputEl])

    const handleUrlInputChange = (videoUrl:string) => {
        setYoutubeUrl(videoUrl)
        if(videoUrl.length > 10){
            getVideoDetailsByUrl(videoUrl)
            .then(res => {                
                const youtube_data = res.data.items[0].snippet;
                setYoutubeShow({...youtube_data, videoId:res.data.items[0].id});
            })
            .catch(err => setYoutubeShow(null))
        }
    }

    return(
        <div className="youtube-picker">
            <div className={`container-picker ${youtubeShow != null? 'row-layout':''}`}> 
                <div className="recently-view">
                    {
                        recentlyViewed.length === 0?
                        (
                            <React.Fragment>
                                {/* <img src="/assets/svg/youtube.svg" alt="no-recently-view"/> */}
                                <p>
                                    Hi trainer,<br/>
                                    for the first research please set the Youtube url <br/>
                                    you want to choose in the input field above
                                </p>
                            </React.Fragment>
                        ):(<div></div>)
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