import React,{useState} from 'react';
import moment from 'moment';
import PickVideoForm from './PickVideoForm';
import ValidTheVideoForm from './ValidTheVideoForm';

import {isVideoExist} from '../../actions/videos';
import axios from 'axios';

import {connect} from 'react-redux';
import { insertNewVideo } from '../../actions/videos';


const AddVideoScreenFoo = (props) => {
    const [phase, setPhase] = useState(0);
    const [loadnig, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [pickedVideo, setPickedVideo] = useState(null);


    const isExistOnFirebase = (video) => {
        setError(null);
        if(video.videoId === '' || video.videoId == null){
            setError(`You didn't enter any video Id`);
            return;
        }
        console.log(video)
        setLoading(true);
        isVideoExist(video.videoId)
        .then(() => setError(`It's look like we already have this video on our platform`))
        .catch(() => {
            getVideoDetails(video.videoId)
            .then(({data}) => {
                console.log(data)
                if(data.items.length > 0){
                    video = {
                        ...video,
                        ...convertDetails(data),
                        videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`
                    };
                    setPickedVideo(video)
                    setPhase(phase+1);
                } else {
                    setError(`It's look like you entered an unvalid Id `)
                }
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const convertDetails = (data) => {
        let { title, thumbnails } = data.items[0].snippet;
        let duration = data.items[0].contentDetails.duration;
        let length = "L";
        const { hours, minutes, seconds } = moment.duration(
          duration,
          "m"
        )._data;
        if (hours === 0) {
          if (minutes <= 30) {
            length = "S";
          } else {
            length = "M";
          }
        }
        return {
            title,
            allThumbnails: thumbnails,
            duration: {
                hours, minutes, seconds
            },
            length
        }
    }
    const getVideoDetails = (videoId) => {
        const KEY = "AIzaSyBVGMQU9KNm311Z-5b8jZJo8bnfQo_3i8U";
        const BASE_URL = "https://www.googleapis.com/youtube/v3";    
        const part = "snippet,statistics,contentDetails";
        return axios.get(`${BASE_URL}/videos?key=${KEY}&part=${part}&id=${videoId}`)
    }

    const insertVideo = (event) => {
        setLoading(true);
        props.startInsertNewVideo(pickedVideo)
        .then(() => setSuccess('Thank You!! You have successfully created new workout!'))
        .finally(() => setLoading(false))
    }

    return(
        <div className="st-pusher">
            <div className="st-content">
                <div className="st-content-inner" id="addVideo">
                    <div className="container-fluid">
                    <h4 className="page-section-heading">Add Video</h4>
                        <div className="panel panel-default">
                            <div className="panel-body" style={{position:"relative"}}>
                                {success && <div className="alert alert-success" role="alert">{success}</div>}
                            
                                {loadnig && <Loader/>}
                                {phase === 0 &&
                                    <PickVideoForm isExist={(video) => isExistOnFirebase(video)}
                                                    error={error}/>
                                }
                                {phase === 1 &&
                                    <ValidTheVideoForm  videoDetails={pickedVideo}
                                                        success={!!success}
                                                        insertVideo={() => insertVideo()}/>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startInsertNewVideo: (newVideo) => dispatch(insertNewVideo(newVideo)),
})
  
export const AddVideoScreen = connect(null,mapDispatchToProps)(AddVideoScreenFoo)
const Loader = () => (<div className="jvectormap-spinner" style={{backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 9999}}></div>)