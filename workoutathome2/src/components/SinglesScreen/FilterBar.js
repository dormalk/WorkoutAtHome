/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {workoutTypes, workoutEquipment} from '../../configs/siteConfigs';
import { connect } from 'react-redux';
import { updateSinglesFilters } from '../../actions/videos';
import {workoutDurations} from '../../configs/videoParams';


const mapDispatchToProps = (dispatch) => ({
    updateSinglesFilters: (picked,param) => dispatch(updateSinglesFilters(picked,param))
})
const mapStateToProps = (state) => ({
    filters: state.videodata.filters,

})
export default connect(mapStateToProps,mapDispatchToProps)((props) => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    const isActive = (picked,param) => {
        return props.filters[param].includes(picked)
    } 

    const onPressFilter = (picked,param) => {
        props.updateSinglesFilters(picked, param)
        forceUpdate();
    }
    return (
        <div    className={`sidebar left sidebar-size-2  sidebar-skin-white sidebar-visible-desktop ${props.showBar? 'st-effect-1': 'sidebar-closed'}`}
                id="left-filter"
                data-type="collapse"
        >
            <div data-scrollable>
                <h4 className="category">Workout Type</h4>
                <ul id='type' className="sidebar-block list-group list-group-menu list-group-minimal" >
                {
                    workoutTypes.map((type) => 
                        <li key={ type } 
                            className={`list-group-item ${isActive(type,'type')?'active':''}`} 
                            style={{cursor: "pointer"}}
                            onClick={() => {onPressFilter(type, 'type')}}>
                            <a><span className="badge pull-right"></span> {type}</a>
                        </li>            
                    )
                }
                </ul>
                <h4 className="category">Duration</h4>
                <ul id='duration'className="sidebar-block list-group list-group-menu list-group-minimal">
                {
                    workoutDurations.map(duration => 
                        <li className={`list-group-item ${isActive(duration,'duration')?'active':''}`} 
                            style={{cursor: "pointer"}} 
                            onClick={() => {onPressFilter(duration, 'duration')}}
                            key={duration.label}>
                            <a><span className="badge pull-right"> {duration.duration} </span> {duration.label}</a>
                        </li>
                    )
                }
                </ul>
                <h4 className="category">Equipment</h4>
                <ul id='equipment' className="sidebar-block list-group list-group-menu list-group-minimal">
                {
                    workoutEquipment.map((equip) =>
                        <li key={ equip } 
                            className={`list-group-item ${isActive(equip,'equipment')?'active':''}`} 
                            onClick={() => {onPressFilter(equip, 'equipment')}}
                            style={{cursor: "pointer"}}>
                            <a><span className="badge pull-right"></span> {equip}</a>
                        </li>            
                    )
                }
                </ul>
            </div>
        </div> 
    )
})