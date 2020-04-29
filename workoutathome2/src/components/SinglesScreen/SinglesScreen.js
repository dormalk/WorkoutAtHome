import React from 'react';
import FilterBar from './FilterBar';
import ListOfSingles from './ListOfSingles';
import { connect } from 'react-redux';
import {createNewSession} from '../../actions/workout_session';
import { generateUniqKey } from '../../helpers/fucntions';
import {Session} from '../../utils/session';
import {activeGlobalAlert} from '../../actions/system';

const SinglesScreenFoo = ({videodata,showBar,userId,activeGlobalAlert}) => {
    const [videos,setVideos] = React.useState(videodata.list||[]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    React.useEffect(() => {
        var {filters,list} = videodata;
        const {type,duration,equipment} = filters;
        if(type.length > 0) list = list.filter(item => type.includes(item.type));
        if(duration.length > 0) list = list.filter(item => mapDuraionFilter(duration).includes(item.length));
        if(equipment.length > 0) list = list.filter(item => {
            var found = false;
            equipment.forEach(equip => {
                found = item.equipments[equip].checked;
            })
            return found;
        })
        list = list.sort((v1,v2) => v2.clicks-v1.clicks)
        setVideos(list)
        forceUpdate();
    },[videodata,forceUpdate])

    

    const onOpenSession = (videoId) => {
        if(!!userId){
            var session = new Session(generateUniqKey(10),userId);
            session.setCurrentVideoId(videoId)
            session.setReletedVideos([videos[0],videos[1],videos[2]])
            createNewSession(session)
            .then(() => {
                window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
            })
        } else activeGlobalAlert({type: 'danger', message:'You have to sign-in to create a session'});
    }


    function mapDuraionFilter(duraions){
        return duraions.map((d) => {
            if(d.label === "Short") return 'S';
            else if(d.label === "Medium") return 'M';
            else if(d.label === "Long") return 'L';
            return 'S';
        })
    }

    return(
        <React.Fragment>
            <FilterBar showBar={showBar}/>
            <div className="st-pusher">
                <div className="st-content">
                    <div className="st-content-inner" id="lists">
                        <div className="container-fluid">
                            <ListOfSingles  videoList={videos} 
                                            onOpenSession={(videoId) => onOpenSession(videoId)}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

   )
}

const mapDispatchToProps = (disptach) => ({
    activeGlobalAlert: (alert) => disptach(activeGlobalAlert(alert))
})

const mapStateToProp = (state) => ({
    videodata: state.videodata,
    showBar: state.system.leftFilter,
    userId: state.userdata.uid
})
export const SinglesScreen = connect(mapStateToProp,mapDispatchToProps)(SinglesScreenFoo)