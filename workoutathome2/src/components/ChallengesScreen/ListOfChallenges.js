/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {convertDurationToString} from '../../utils/challenge';
import {withRouter} from 'react-router-dom';
export default withRouter(({challengesList,userId,history}) => {
    const goToChallengePage = (challenge) => {
        history.push('/challenge?id='+challenge.id)
    }

    return (
        <div>
            <h2>Challenges</h2>
            <div className="row gridalicious" data-toggle="gridalicious" data-width="200" id="challenges">
                {
                    challengesList && challengesList.map(Challenge => 
                        <div className="panel panel-default" key={Challenge.id}>
                            <div className="cover overlay hover cover-image-full" style={{height: 'unset'}}>
                                <img src={Challenge.thumbnails} alt="music" />
                                <div className="overlay overlay-full overlay-hover overlay-bg-black">
                                    <div className="v-center">
                                        <a className="btn btn-lg btn-circle btn-white" onClick={() => {goToChallengePage(Challenge)}}><i className="fa fa-play"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <h4 className="margin-none title"><a>{Challenge.title}</a></h4>
                                <span className="text-grey-500">{Challenge.tagTypes.map(type=> <span key={type}>{type} </span>)}</span><br/>
                                <span className="text-grey-500">{convertDurationToString(Challenge.avgDuration)}</span>
                            </div>
                      </div>
                    )
                }
            </div>
              
        </div>
    )
})