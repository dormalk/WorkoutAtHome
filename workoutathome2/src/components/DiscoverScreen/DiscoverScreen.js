import React from 'react';
import { connect } from 'react-redux';
import RewordsList from './RewordsList';
import TopWorkouts from './TopWorkouts';
import { generateUniqKey } from '../../helpers/fucntions';
import {Session} from '../../utils/session';
import {activeGlobalAlert} from '../../actions/system';
import {createNewSession} from '../../actions/workout_session';
import { startSignInWithGoogle } from '../../actions/auth';

const mapDispatchToProps = (dispatch) => ({
  activeGlobalAlert: (alert) => dispatch(activeGlobalAlert(alert)),
  startSignInWithGoogle: () => dispatch(startSignInWithGoogle()),

})
const mapStateToProps = (state) => ({
  userdata: state.userdata,
  videos: state.videodata.list,
  userTypesPreference: state.userdata.preference && state.userdata.preference.calcTypes

})
export const DiscoverScreen = connect(mapStateToProps,mapDispatchToProps)
    (({userdata,videos,userTypesPreference,activeGlobalAlert,startSignInWithGoogle}) => {
  const onOpenSession = (videoId) => {
    if(!!userdata.uid){
        var session = new Session(generateUniqKey(10),userdata.uid);
        session.setCurrentVideoId(videoId)
        session.setReletedVideos([videos[0],videos[1],videos[2]])
        createNewSession(session)
        .then(() => {
            window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
        })
    } else activeGlobalAlert({type: 'danger', message:'You have to sign-in to create a session'});
}
  return(
        <div className="st-pusher">
          <div className="st-content">
            <div className="st-content-inner">

              <div className="container-fluid">

                <h1>This Week's Highlights</h1>
                <div className="row">
                  <div className="col-lg-8 col-md-7">
                  {
                    videos.length > 0 &&
                    <TopWorkouts videos={videos}
                                    onOpenSession={(videoid) => onOpenSession(videoid)}
                                    userTypesPreference={userTypesPreference}/>
                  }  
                  </div>
                  <div className="col-lg-4 col-md-5">
                    <RewordsList userdata={userdata} onSignIn={startSignInWithGoogle.bind(this)}/>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">Upcoming Events</h4>
                  </div>
                  <div className="owl-mixed">

                    <div className="item">
                      <div className="media media-clearfix-xs-min">
                        <div className="media-left">
                          <img src="images/300/main-playing-guitar.jpg" alt="" className="media-object" />
                        </div>
                        <div className="media-body">
                          <h4 className="media-heading"><a href="http://google.com">Live with Michael Star</a></h4>
                          <p className="meta"><span><i className="fa fa-calendar-o fa-fw"></i> 04 Feb 2015</span><span><i className="fa fa-map-marker fa-fw"></i>Amsterdam, NL</span></p>
                          <p>Join Michael in his live concert at the Amsterdam Hall. Gift tickets available!</p>
                        </div>
                      </div>
                    </div>

                    <div className="item">
                      <div className="media media-clearfix-xs-min">
                        <div className="media-left">
                          <img src="images/300/beauty-fashion-portrait.jpg" alt="" className="media-object" />
                        </div>
                        <div className="media-body">
                          <h4 className="media-heading"><a href="http://google.com">Love Songs by Michelle</a></h4>
                          <p className="meta"><span><i className="fa fa-calendar-o fa-fw"></i> 29 Mar 2014</span><span><i className="fa fa-map-marker fa-fw"></i>Munich, Germany</span></p>
                          <p>Watch Michelle's performance in Munich.</p>
                        </div>
                      </div>
                    </div>

                    <div className="item">
                      <div className="media media-clearfix-xs-min">
                        <div className="media-left">
                          <img src="images/400/singing-woman.jpg" alt="" className="media-object" />
                        </div>
                        <div className="media-body">
                          <h4 className="media-heading"><a href="http://google.com">Star Girl</a></h4>
                          <p className="meta"><span><i className="fa fa-calendar-o fa-fw"></i> 04 Feb 2015</span><span><i className="fa fa-map-marker fa-fw"></i>Amsterdam, NL</span></p>
                          <p>Join Start in her live concert at the Amsterdam Hall.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">Albums and EPs</h4>
                  </div>
                  <div className="panel-body">
                    <div className="owl-basic" data-items="5">
                      <div className="item">
                        <div className="cover overlay hover">
                            <a href="http://google.com">
                            <img src="images/400/autumn-woman-fall.jpg" alt="music" className="img-responsive" />
                          </a>
                          <a href="album.html" className="overlay overlay-full overlay-hover overlay-bg-black">
                            <span className="v-center">
                                    <span className="btn btn-lg btn-circle btn-white">
                                        <i className="fa fa-play"></i>
                                    </span>
                            </span>
                          </a>
                        </div>
                        <h4 className="margin-bottom-none"><a href="http://google.com">Godspeed</a></h4>
                        <span className="text-grey-500">Soul</span>
                      </div>
                      <div className="item">
                        <div className="cover overlay hover">
                          <img src="images/400/fashion-beauty-portrait-sexy-girl.jpg" alt="music" className="img-responsive" />
                          <a href="album.html" className="overlay overlay-full overlay-hover overlay-bg-black">
                            <span className="v-center">
                                    <span className="btn btn-lg btn-circle btn-white">
                                        <i className="fa fa-play"></i>
                                    </span>
                            </span>
                          </a>
                        </div>
                        <h4 className="margin-bottom-none"><a href="http://google.com">Dreams</a></h4>
                        <span className="text-grey-500">Shine</span>
                      </div>
                      <div className="item">
                        <div className="cover overlay hover">
                          <img src="images/400/portrait-of-man-with-guitar.jpg" alt="music" className="img-responsive" />
                          <a href="album.html" className="overlay overlay-full overlay-hover overlay-bg-black">
                            <span className="v-center">
                                    <span className="btn btn-lg btn-circle btn-white">
                                        <i className="fa fa-play"></i>
                                    </span>
                            </span>
                          </a>
                        </div>
                        <h4 className="margin-bottom-none"><a href="google.com">My Band</a></h4>
                        <span className="text-grey-500">Awesome</span>
                      </div>
                      <div className="item">
                        <div className="cover overlay hover">
                          <img src="images/400/young-couple-in-love.jpg" alt="music" className="img-responsive" />
                          <a href="album.html" className="overlay overlay-full overlay-hover overlay-bg-black">
                            <span className="v-center">
                                    <span className="btn btn-lg btn-circle btn-white">
                                        <i className="fa fa-play"></i>
                                    </span>
                            </span>
                          </a>
                        </div>
                        <h4 className="margin-bottom-none"><a href="http://google.com">Angels</a></h4>
                        <span className="text-grey-500">Heaven</span>
                      </div>
                      <div className="item">
                        <div className="cover overlay hover">
                          <img src="images/400/portrait-trendy-hair-style.jpg" alt="music" className="img-responsive" />
                          <a href="album.html" className="overlay overlay-full overlay-hover overlay-bg-black">
                            <span className="v-center">
                                    <span className="btn btn-lg btn-circle btn-white">
                                        <i className="fa fa-play"></i>
                                    </span>
                            </span>
                          </a>
                        </div>
                        <h4 className="margin-bottom-none"><a href="http://google.com">Pop Rock</a></h4>
                        <span className="text-grey-500">Surreal</span>
                      </div>
                      <div className="item">
                        <div className="cover overlay hover">
                        <a href="http://google.com">
                          <img src="images/400/autumn-woman-fall.jpg" alt="music" className="img-responsive" />
                          </a>
                          <a href="album.html" className="overlay overlay-full overlay-hover overlay-bg-black">
                            <span className="v-center">
                                    <span className="btn btn-lg btn-circle btn-white">
                                        <i className="fa fa-play"></i>
                                    </span>
                            </span>
                          </a>
                        </div>
                        <h4 className="margin-bottom-none"><a href="http://google.com">Godspeed</a></h4>
                        <span className="text-grey-500">Soul</span>
                      </div>
                      <div className="item">
                        <div className="cover overlay hover">
                          <img src="images/400/fashion-beauty-portrait-sexy-girl.jpg" alt="music" className="img-responsive" />
                          <a href="album.html" className="overlay overlay-full overlay-hover overlay-bg-black">
                            <span className="v-center">
                                    <span className="btn btn-lg btn-circle btn-white">
                                        <i className="fa fa-play"></i>
                                    </span>
                            </span>
                          </a>
                        </div>
                        <h4 className="margin-bottom-none"><a href="http://google.com">Dreams</a></h4>
                        <span className="text-grey-500">Shine</span>
                      </div>
                      <div className="item">
                        <div className="cover overlay hover">
                          <img src="images/400/portrait-of-man-with-guitar.jpg" alt="music" className="img-responsive" />
                          <a href="album.html" className="overlay overlay-full overlay-hover overlay-bg-black">
                            <span className="v-center">
                                    <span className="btn btn-lg btn-circle btn-white">
                                        <i className="fa fa-play"></i>
                                    </span>
                            </span>
                          </a>
                        </div>
                        <h4 className="margin-bottom-none"><a href="http://google.com">My Band</a></h4>
                        <span className="text-grey-500">Awesome</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

    )
})