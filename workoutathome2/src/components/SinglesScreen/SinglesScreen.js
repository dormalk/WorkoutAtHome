import React from 'react';
import FilterBar from './FilterBar';
import ListOfSingles from './ListOfSingles';
import { connect } from 'react-redux';
import {createNewSession} from '../../actions/workout_session';
import { generateUniqKey } from '../../helpers/fucntions';
import {Session} from '../../utils/session';
import {activeGlobalAlert} from '../../actions/system';
import { getVideosCategories,getVideosCategoriesNext } from '../../actions/videos2.js';

var locker = false;
function timeoutLocker(callback){
    if(!locker){
        locker = !locker;
        callback();
        setTimeout(() => {
            locker = !locker;
        })
    }
}


const SinglesScreenFoo = ({types,duration,showBar,userId,activeGlobalAlert}) => {
    const [videos,setVideos] = React.useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    var isListen = React.useRef(false);


    React.useEffect(() => {
        const onScrollList = (event) => {
            timeoutLocker(() => {
                const list = document.getElementById('lists');
                const categories = types.length === 0? undefined : types;
                if(list.scrollTop + window.innerHeight >= list.scrollHeight) {
                    getVideosCategoriesNext(categories)
                    .then(({data})=> {
                        setVideos(videos => {
                            let updateVideos = videos;
                            data.forEach((video) => updateVideos.push(video));
                            return videos;
                        })
                        forceUpdate()
                    })
                }
            })
        }
    
        function fetchVideos(){
            const categories = types.length === 0? undefined : types;
            getVideosCategories(categories)
            .then(({data}) => {
                setVideos(videos => data)
                console.log(data)
                forceUpdate()
            })
        }

        fetchVideos()
        console.log(duration)
        if(!isListen.current){
            document.getElementById('lists').addEventListener('scroll',onScrollList.bind(this))
            isListen.current = true;
        }

        return(() => {
            document.getElementById('lists').removeEventListener('scroll',onScrollList.bind(this))
        })
    },[types,duration,forceUpdate])

    const onOpenSession = (videoId) => {
            var session = null; 
            if(!!userId){
                session = new Session(generateUniqKey(10),userId);
            } else {
                const uniqUserId = generateUniqKey(8);
                localStorage.setItem('uniqUserId', uniqUserId);
                session = new Session(generateUniqKey(10),uniqUserId);
            }
            session.setCurrentVideoId(videoId)
            session.setReletedVideos([videos[0],videos[1],videos[2]])
            createNewSession(session)
            .then(() => {
                window.open(window.location.origin+'/workout?sessionid='+session.sessionid)
            })

    }

    // function mapDuraionFilter(duraions){
    //     return duraions.map((d) => {
    //         if(d.label === "Short") return 'S';
    //         else if(d.label === "Medium") return 'M';
    //         else if(d.label === "Long") return 'L';
    //         return 'S';
    //     })
    // }

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

const mapStateToProp = (state) => {
    console.log(state.videodata.filters)
    return({
        duration: state.videodata.filters.duration,
        types: state.videodata.filters.type,
        showBar: state.system.leftFilter,
        userId: state.userdata.uid
    })
}
export const SinglesScreen = connect(mapStateToProp,mapDispatchToProps)(SinglesScreenFoo)