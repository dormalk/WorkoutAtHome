import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { closeLeftNav } from '../../actions/system';
import {leftSideNav} from '../../configs/siteConfigs'
import Activities from './Activities';
import TopWorkouts from './TopWorkouts';
import { convertToArr } from '../../helpers/fucntions';

export const LeftSideBarFoo = (props) => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const isActive = (path) => {
      if(window.location.pathname === path) return 'active';
      return '';
    }

    const closeNav = () => {
      forceUpdate();
      props.closeLeftNav();
    } 
    return (
      <div className={`sidebar left sidebar-size-1 sidebar-mini-reveal sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop ${props.showBar? 'st-effect-1': 'sidebar-closed'}`} id="sidebar-menu" data-type="dropdown" style={{zIndex: 999}}>
      <div data-scrollable="" tabIndex="2" style={{overflowY: "hidden", outline: "none"}}>
        <ul className="sidebar-menu sm-active-item-bg sm-icons-block sm-icons-right">
          {
            leftSideNav.map(link => 
              <li key={link.label} onClick={closeNav.bind(this)} className={isActive(link.redirectTo)}><Link to={link.redirectTo}><i className={link.icone}></i><span>{link.label}</span></Link></li>
            )
          }
        </ul> 
        
        {
          props.userId && (

            <React.Fragment>
            <Activities activities={props.activities || []}
                        videos={props.videos}
                        userId={props.userId}/>
            <TopWorkouts workouts={() => {
                          let clickVideoActivities = {};
                          if(!props.activities) return [];
                          props.activities.forEach((activity) => {
                            if(activity.type === 'clickVideo'){
                              if(!clickVideoActivities[activity.videoId]) clickVideoActivities[activity.videoId] =  {clicks: 0};
                              clickVideoActivities[activity.videoId].clicks++;
                            }
                          })
                          clickVideoActivities = convertToArr(clickVideoActivities);
                          console.log(clickVideoActivities)
                          clickVideoActivities = clickVideoActivities.sort((v1,v2) => v2.clicks - v1.clicks);
                          return clickVideoActivities.filter((elem,index) => index < 5)
                                                      .map((a) => props.videos.find(v => v.videoId === a.id));
                        }}
                        videos={props.videos}
                        userId={props.userId}
                        />
              </React.Fragment>
          )
        }
        </div>
        <div id="ascrail2002" className="nicescroll-rails" style={{width: "5px", Zindex: "2", cursor: "default", position: "absolute", top: "0px", left: "194px", height: "562px", opacity: "0"}}>
            <div style={{
                position: "relative", top: "0px", float: "right", width: "5px", height: "469px", backgroundColor: "rgb(52, 152, 219)", border: "0px", backgroundClip: "padding-box", borderRadius: "5px"
            }}></div></div></div>

    )
}

const mapDistpachToProps = (dispatch) => ({
  closeLeftNav: () => dispatch(closeLeftNav())
})

const mapStateToProps = (state) => ({
  showBar: state.system.leftNav,
  activities: state.userdata.activities,
  videos: state.videodata.list,
  userId: state.userdata.uid
})


export const LeftSideBar = connect(mapStateToProps,mapDistpachToProps)(LeftSideBarFoo)