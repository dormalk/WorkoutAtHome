import React from 'react';
import {connect} from 'react-redux';
import {Page} from '../Commons/Page';
import { updateVideoThumbnails } from '../../actions/videos';

const mapStateToProps = (state) => ({
    videos: state.videodata.list
})

export const FixVideos =  connect(mapStateToProps)(({videos}) => {
    return(
        <Page>
            <ul>
                {
                    videos&&videos
                    .filter((video) => video.allThumbnails === undefined)
                    .map((video) => {
                        return (
                            <li key={video.videoId}>
                                <h3>{video.title} / {video.videoId}</h3>
                                <button onClick={() => updateVideoThumbnails(video.videoId)} className="btn btn-primary">
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