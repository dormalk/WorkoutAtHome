/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { ToggleBar } from './ToggleBar';

const mapStateToProps = (state) => ({
    filters: state.videodata.filters,
})
export default connect(mapStateToProps,null)((props) => {


    return (
        <div    className={`sidebar left sidebar-size-2  sidebar-skin-white sidebar-visible-desktop ${props.showBar? 'st-effect-1': 'sidebar-closed'}`}
                id="left-video-editor"
                data-type="collapse"
        >
            <div data-scrollable>
                <ToggleBar title="Video details">
                    <input type="text" className="form-control"/>
                </ToggleBar>
                <ToggleBar title="List of components">
                    Components
                </ToggleBar>
          </div>
        </div> 
    )
})