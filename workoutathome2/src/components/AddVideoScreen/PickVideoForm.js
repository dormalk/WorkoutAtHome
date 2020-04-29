import React,{useState} from 'react';
import {workoutTypes, workoutEquipment} from '../../configs/siteConfigs';

export default ({isExist,error}) => {
    const initEquipment = () => {
        var equipments = {};
        workoutEquipment.forEach(equip => {
            equipments[equip] = {checked: false};
        })
        return equipments;
    }

    
    const [videoId, setVideoId] = useState('');
    const [equipments,setEquipments] = useState(initEquipment());
    const [type,setType] = useState(workoutTypes[0]);    
    
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const updateEquipment = (equip,checked) => {
        equipments[equip].checked = checked;
        setEquipments(equipments)
        forceUpdate(); 
    }

    const onPressContinue = (event) => {
        event.preventDefault();
        const video = {
            videoId, equipments, type
        }
        isExist(video);
    }
    return(
        <form className="form-horizontal">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className={`form-group ${error && 'has-error'}`}>
                <label className="col-sm-2 control-label" htmlFor="video-id">Video ID</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" value={videoId} onChange={(event) => setVideoId(event.target.value)}/>
                    <small className="form-text mt-1"><b>example:</b> https://www.youtube.com/watch?v=<span
                        className="bg-warning font-weight-bold">dNEZKqopc2I</span>
                        <p className="font-weight-bold"> *Please enter the highlighted section of the url only</p></small>
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-2 control-label" >Equipment</label>
                <div className="col-sm-8">
                    {
                        workoutEquipment.map(equip => 
                        <div className="checkbox checkbox-primary checkbox-circle" key={equip}>
                            <input id={`${equip}_chackbox`} type="checkbox" checked={equipments[equip].checked} onChange={(event) => updateEquipment(equip,!equipments[equip].checked)}/>
                            <label htmlFor={`${equip}_chackbox`}>{equip}</label>
                        </div>
    )
                    }                                  
                </div>
            </div>

            <div className="form-group">
                <label className="col-sm-2 control-label" >Type</label>
                <div className="col-sm-8">                                        
                    <select className="form-control" onChange={(event) => setType(event.target.value)}>
                        {workoutTypes.map(type=><option key={type}>{type}</option>)}
                    </select>
                </div>
            </div> 
            <center>
                <button onClick={onPressContinue.bind(this)} className="btn btn-teal-500">
                    Continue
                </button>                                
            </center>
        </form>
    )
}