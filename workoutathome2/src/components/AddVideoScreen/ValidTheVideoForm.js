import React from 'react';


export default ({videoDetails,insertVideo,success}) => {

    const convertDuration = ({hours,minutes,seconds}) => {
        console.log(hours,minutes,seconds)
        return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(
            -2
        )}:${("0" + seconds).slice(-2)}`;
    }

    const onPressUpload = (event) => {
        event.preventDefault();
        insertVideo(videoDetails);
    }
    return (
        <form className="form-horizontal">
            <div className="mx-auto col-6 border m-2 py-2 px-4 shadow rounded animated slideInLeft" id="form-wrapper">
                <div className="alert alert-dark" role="alert">
                    Hey, we got some details about your video from YouTube, you can add to the Title if you want to.
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="video-url">Video Title</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" value={videoDetails.title} onChange={() => {}}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="video-url" >Video Duration</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" value={convertDuration(videoDetails.duration)} onChange={() => {}}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="video-url">Video Url</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control"  value={videoDetails.videoUrl} onChange={() => {}}/>
                    </div>
                </div>
                <div className='text-center mt-3'> 
                    <img src={videoDetails.thumbnails} className='rounded shadow' alt='video'/>
                    <br/>
                    {!success&&
                        <button className='btn btn-indigo-500' style={{marginTop: "10px"}} onClick={onPressUpload.bind()}>Upload Video </button>
                    }
                </div>
            </div>
        </form>
    )
}