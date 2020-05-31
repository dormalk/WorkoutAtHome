import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import {convertDurationToString} from '../../utils/video'

export default ({days,videos,onUpdate}) => {
    const [pickedDay,setPickedDay] = React.useState(1)
    const [selectedValues, setSelectedValues] = React.useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function renderTabs(){
        var tabs = [];
        for(let i = 1; i <= days; i++)
            tabs.push(  <li key={i} className={`${pickedDay === i? 'active': ''}`} onClick={() => setPickedDay(i)}>
                            <a href={`day${i}`} data-toggle="tab"><i className="fa fa-fw fa-star"></i> Day {i}</a>
                        </li>)
        return tabs;

    }

    function renderCard(video){
        return(
            <div className="panel panel-default" key={video.videoId} style={{display: 'flex'}}>
                <div className="cover cover-image-full" style={{flex: 1}}>
                    <img src={video.thumbnails} alt="music" />
                </div>
                <div className="panel-body" style={{flex: 2}}>
                    <h4 className="margin-none title">{video.title}</h4>
                    <span className="text-grey-500">{video.type}</span><br/>
                    <span className="text-grey-500">{convertDurationToString(video.duration)}</span>
                </div>
            </div>
        )
    }

    function renderPane(){
        var panes = [];
        var mapdsVideoIds = selectedValues[pickedDay-1]? selectedValues[pickedDay-1].map(v => v.id) : [];

        for(let i = 1; i <= days; i++) 
            panes.push(<div key={i} id={`day${i}`} className={`tab-pane ${pickedDay === i? 'active': ''}`}>
                {
                    videos.filter(v => mapdsVideoIds.includes(v.videoId))
                            .map(v => renderCard(v))
                }
            </div>) 
            
        return panes;

    }

    const onSelect = (selectedList, selectedItem) => {
        selectedValues[pickedDay-1] = selectedList;
        selectedValues[pickedDay-1] = updateData();
        setSelectedValues(selectedValues)
        onUpdate(selectedValues)
        forceUpdate();

    }
    const onRemove = (selectedList, selectedItem) => {
        selectedValues[pickedDay-1] = selectedList;
        selectedValues[pickedDay-1] = updateData();
        setSelectedValues(selectedValues)
        onUpdate(selectedValues)
        forceUpdate();
    }

    const updateData = () => {
        return selectedValues[pickedDay-1].map(video => {
            var videoFullDetails = videos.find(v => v.videoId === video.id)
            video.type = videoFullDetails.type;
            video.duration = videoFullDetails.duration;
            video.thumbnails = videoFullDetails.thumbnails;
            return video;
        })
    }
    return(
        <React.Fragment>
            {
                videos && (
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="video-id">Pick a Videos</label>
                        <div className="col-sm-8">
                            <Multiselect
                                options={videos.map(v=> {return {name: v.title, id: v.videoId}})} // Options to display in the dropdown
                                selectedValues={selectedValues[pickedDay-1] || []} // Preselected value to persist in dropdown
                                onSelect={(selectedList, selectedItem) => onSelect(selectedList, selectedItem)} // Function will trigger on select event
                                onRemove={(selectedList, selectedItem) => onRemove(selectedList, selectedItem)} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                            />
                        </div>
                    </div>
                )
            }
            <div className="tabbable tabs-vertical tabs-left">
                <ul className="nav nav-tabs">
                    {
                        renderTabs()
                    }              
                </ul>
                <div className="tab-content">
                {
                    renderPane()
                }
                </div>     
            </div> 
        </React.Fragment>    
    )
}