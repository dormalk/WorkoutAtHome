/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {workoutTypes, workoutEquipment} from '../../configs/siteConfigs';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    filters: state.videodata.filters,
})
export default connect(mapStateToProps,null)((props) => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    return (
        <div    className={`sidebar left sidebar-size-2  sidebar-skin-white sidebar-visible-desktop ${props.showBar? 'st-effect-1': 'sidebar-closed'}`}
                id="left-video-editor"
                data-type="collapse"
        >
            <div data-scrollable>
                <h4 className="category">Video Details</h4>
                <ul id='type' className="sidebar-block list-group list-group-menu list-group-minimal" >
                    <li><input type="text" className="form-control"/></li>
                </ul>
          </div>
        </div> 
    )
})