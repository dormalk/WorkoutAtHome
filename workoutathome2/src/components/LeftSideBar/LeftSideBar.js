import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { closeLeftNav } from '../../actions/system';
import {leftSideNav} from '../../configs/siteConfigs'
import Activities from './Activities';

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
          <Activities activities={props.activities}
                      videos={props.videos}
                      userId={props.userId}/>
        <h4 className="category">Top Plays</h4>
        <div className="sidebar-block list-group list-group-menu list-group-striped">
          <div className="list-group-item">
            <div className="media">
              <div className="media-left">
                <a href="album.html">
                  <img src="images/50/main-playing-guitar.jpg" width="35" alt="cover" className="media-object"/>
                </a>
              </div>
              <div className="media-body">
                <h4 className="text-h5 media-heading margin-v-1-2"><a href="album.html">Bloom</a></h4>
                <p className="text-grey-500">Woodland (2011)</p>
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="media">
              <div className="media-left">
                <a href="album.html">
                  <img src="images/50/portrait-trendy-hair-style.jpg" width="35" alt="cover" className="media-object"/>
                </a>
              </div>
              <div className="media-body">
                <h4 className="text-h5 media-heading margin-v-1-2"><a href="album.html">Dreams</a></h4>
                <p className="text-grey-500">Shinning (2014)</p>
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="media">
              <div className="media-left">
                <a href="album.html">
                  <img src="images/50/singing-woman.jpg" width="35" alt="cover" className="media-object"/>
                </a>
              </div>
              <div className="media-body">
                <h4 className="text-h5 media-heading margin-v-1-2"><a href="album.html">Something</a></h4>
                <p className="text-grey-500">Different (2014)</p>
              </div>
            </div>
          </div>
        </div>
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