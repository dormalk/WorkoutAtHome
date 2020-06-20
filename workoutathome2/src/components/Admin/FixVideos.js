import React from 'react';
import {connect} from 'react-redux';
import {Page} from '../Commons/Page';
import { insertNewVideo } from '../../actions/videos';

const mapStateToProps = (state) => ({
    videos: state.videodata.list
})

const mapDispatchToProps = (dispatch) => ({
    startInsertNewVideo: (newVideo) => dispatch(insertNewVideo(newVideo)),
})

export const FixVideos =  connect(mapStateToProps,mapDispatchToProps)(({videos,startInsertNewVideo}) => {
    return(
        <Page>
            <ul>
                {
                    videos&&videos
                    .map((video) => {
                        return (
                            <li key={video.videoId}>
                                <h3>{video.title} / {video.videoId}</h3>
                                <button onClick={() => startInsertNewVideo(video)} className="btn btn-primary">
                                    update
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </Page>
    )
})