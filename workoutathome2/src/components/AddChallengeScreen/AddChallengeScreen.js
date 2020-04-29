import React,{useState} from 'react';
import { connect } from 'react-redux';
import ChallengeDetailsForm from './ChallengeDetailsForm';
import {insertNewChallenge} from '../../actions/challenges';
import {Link} from 'react-router-dom';

const mapDispatchToProps = (dispatch) => ({
    insertChallenge: (newChallenge) => dispatch(insertNewChallenge(newChallenge))
})

const mapStateToProps = (state) => ({
    videos: state.videodata.list,
    uid: state.userdata.uid,
    challeges: state.challengedata.list
})

export const AddChallengeScreen = connect(mapStateToProps,mapDispatchToProps)
    (({videos,uid,insertChallenge,challeges}) => {
    const [loadnig, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [challengeId, setChellegeId] = useState(null)
    
    const onCreate = (newChallenge) => {
        newChallenge.createBy = uid;
        setLoading(true)
        return insertChallenge(newChallenge)
        .then(() => {
            setSuccess('Well done! Your challege succesully created');
            setChellegeId(newChallenge.id);
            setLoading(false)
        })
    }
    return(
        <div className="st-pusher">
            <div className="st-content">
                <div className="st-content-inner" id="addVideo">
                    <div className="container-fluid">
                    <h4 className="page-section-heading">Create Challenge</h4>
                        <div className="panel panel-default">
                            <div className="panel-body" style={{position:"relative"}}>
                                {success && <div className="alert alert-success" role="alert">{success} <Link to={`/challenge?id=${challengeId}`}><b>Go to your new challenge</b></Link></div>}
                                {loadnig && <Loader/>}
                                <ChallengeDetailsForm   videos={videos}
                                                        challeges={challeges} 
                                                        onSubmit={(newChallenge) => onCreate(newChallenge)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

const Loader = () => (<div className="jvectormap-spinner" style={{backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 9999}}></div>)