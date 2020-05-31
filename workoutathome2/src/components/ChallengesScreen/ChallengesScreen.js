import React from 'react';
import FilterBar from './FilterBar';
import ListOfChallenges from './ListOfChallenges';
import { connect } from 'react-redux';

const ChallengesScreenFoo = ({challengedata,showBar,userId}) => {
    const [challenges,setChallenges] = React.useState(challengedata.list||[]);

    React.useEffect(() => {
        var {filters,list} = challengedata;
        const {type,duration} = filters;
        if(type.length > 0) list = list.filter(item => {
            var flag = false;
            type.forEach(t => {
                if(item.tagTypes.includes(t)) flag = true;
            })
            return flag;
        });

        if(duration.length > 0) list = list.filter(item => {
            var flag = false;
            duration.forEach(d => {
                if(d.label === 'Short' && item.avgDuration.hour === 0 && item.avgDuration.minutes <= 30) flag = true;
                else if(d.label === 'Medium' && (item.avgDuration.hour >= 1 || item.avgDuration.minutes >= 30)) flag = true;
                else if(d.label === 'Long' && item.avgDuration.hour >= 1) flag = true;

            })
            return flag;
        });

        setChallenges(list)
    },[challengedata])

    return(
        <React.Fragment>
            <FilterBar showBar={showBar}/>
            <div className="st-pusher">
                <div className="st-content">
                    <div className="st-content-inner" id="lists">
                        <div className="container-fluid">
                            <ListOfChallenges challengesList={challenges} userId={userId}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

   )
}

const mapStateToProp = (state) => ({
    challengedata: state.challengedata,
    showBar: state.system.leftFilter,
    userId: state.userdata.uid
})
export const ChallengesScreen = connect(mapStateToProp)(ChallengesScreenFoo)