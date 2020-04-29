import React from 'react';
import DaysEditor from './DaysEditor';
import { generateUniqKey } from '../../helpers/fucntions';


export default ({videos,onSubmit,challeges}) => {
    const [title,setTitle] = React.useState('');
    const [titleError, setTitleError] = React.useState(false)
    const [days,setDays] = React.useState(0);
    const [daysError, setDaysError] = React.useState(false)
    const [showButton, setShowButton] = React.useState(false);
    const [selectedVideos,setSelectedVideos] = React.useState([]);
    const [forceEffect, setForceEffect] = React.useState(false);



    React.useEffect(() => {
        if(title.length > 0 && days > 0 && selectedVideos.length == days){
            let flag = true;
            for(let i = 0 ; i < selectedVideos.length; i++){
                if(!selectedVideos[i] || selectedVideos[i].length === 0) flag = false
            }
            setShowButton(flag)
        } else {
            setShowButton(false)
        }
    },[title,days,forceEffect,selectedVideos])
    
    const onUpdateDays = (_selectedVideos) => {
        setSelectedVideos(_selectedVideos);
        setForceEffect(!forceEffect)
    }

    const onClickSubmit = (event) => {
        event.preventDefault();
        const newChallenge = {
            id: generateUniqKey(18),
            title,
            days: selectedVideos
        }
        if(!isChallenegeExist(newChallenge)){
            setTitleError(false)
            onSubmit(newChallenge)
            .then(() => {
                setShowButton(false)
            })
        } else {
            setTitleError(true)
        }
    }

    const isChallenegeExist = ({title}) => {
        return challeges.filter(challenge => challenge.title === title).length > 0;
    }

    return(
        <form className="form-horizontal" id="create-challenge">
            {titleError&&<div className="alert alert-danger">There is already challenge with the same title</div>}
            <div className={`form-group ${titleError? 'has-error' : ''}`}>
                <label className="col-sm-2 control-label" htmlFor="video-id">Title</label>
                <div className="col-sm-8">
                    <input  type="text" 
                            className="form-control" 
                            value={title} 
                            onChange={(event) => {
                                setTitle(event.target.value);
                                setTitleError(false)
                            }}/>
                </div>
            </div>
            <div className={`form-group ${daysError? 'hasError' : ''}`}>
                <label className="col-sm-2 control-label" htmlFor="video-id">Days</label>
                <div className="col-sm-8">
                    <input type="number" className="form-control" value={days} onChange={(event) => event.target.value >= 0 && setDays(event.target.value)}/>
                </div>
            </div>
            {
                days > 0 && <DaysEditor days={days} videos={videos} onUpdate={(days) => onUpdateDays(days)}/>
            }
            <center>        
            {
                showButton && <button className="btn btn-primary" onClick={(event) => onClickSubmit(event)}>Create</button>
            }
            </center>
        </form>
    )
}