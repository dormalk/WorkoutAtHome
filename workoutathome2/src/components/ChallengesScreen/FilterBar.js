/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {workoutTypes} from '../../configs/siteConfigs';
import { connect } from 'react-redux';
import { updateChallengesFilters } from '../../actions/challenges';

const workoutDurations = [
    {
        label: 'Short',
        duration: '< 30m'
    },
    {
        label: 'Medium',
        duration: '30m < 60m'
    },
    {
        label: 'Long',
        duration: '60m >'
    },
]
const mapDispatchToProps = (dispatch) => ({
    updateChallengesFilters: (picked,param) => dispatch(updateChallengesFilters(picked,param))
})
const mapStateToProps = (state) => ({
    filters: state.challengedata.filters,

})
export default connect(mapStateToProps,mapDispatchToProps)((props) => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    const isActive = (picked,param) => {
        return props.filters[param].includes(picked)
    } 

    const onPressFilter = (picked,param) => {
        props.updateChallengesFilters(picked, param)
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

            </div>
        </div> 
    )
})