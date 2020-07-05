import React from 'react';
import { FilePicker } from '../../commons';
import { FileDetails } from '../../../types/file';
import { FileElement } from '../../commons/FileElement';
import { useDispatch } from 'react-redux';
import { updateWorkoutCompnent, addWorkoutCompnent } from '../../../actions/virtual-room';
import { Rest } from '../../../types/rest';
import { WorkoutTypes } from '../../../types/workout-plan';
import { useLastLocation } from 'react-router-last-location';
import { matchPath } from 'react-router';
import { useRouter } from '../../../routers/useRouter';



interface Props{
    rest?: {
        component: Rest,
        index: number
    };
    editMode: boolean;
}

export default (props:Props) => {
    const [goodWords, setGoodWords] = React.useState('');
    const [restDuration, setRestDuration] = React.useState<number>(0);
    const [reletedVideo, setReletedVideo] = React.useState<FileDetails>();

    const router = useRouter();
    const lastLocation = useLastLocation()


    React.useEffect(() => {
        if(props.editMode && !!props.rest){
            setRestDuration(props.rest?.component.duration);
            if(!!props.rest.component.goodWords)setGoodWords(props.rest.component.goodWords);
            if(!!props.rest.component.attach)setReletedVideo(props.rest.component.attach);
            else setReletedVideo(undefined)
        }
    },[props])

    const dispatch = useDispatch();
    const handleSubmit = () => {
        const newCompnent: Rest = {
            goodWords: goodWords,
            duration: restDuration,
            attach: reletedVideo as FileDetails,
            type: WorkoutTypes.rest
        }
        reset()
        if(props.editMode && props.rest?.index){
            handlePushBack()
            dispatch(updateWorkoutCompnent(newCompnent,props.rest?.index))
            
        }else{
            dispatch(addWorkoutCompnent(newCompnent))
        }
    }

    const handlePushBack = () => {
        if(lastLocation !== null){
            if(matchPath(lastLocation.pathname, '/editor/create/editcomponent/:id')){
                router.push('/editor/create/addcomponent/excersie')
            } else {
                router.push(lastLocation.pathname);
            }
        }else{
            router.push('/editor/create/addcomponent/excersie')
        }
    }

    const reset = () => {
        setRestDuration(10);
        setGoodWords('');
        setReletedVideo(undefined);
    }

    return(
        <div>
            <h2>{props.editMode? 'Edit':'Add'} Break</h2>
            <div className="form-group">
                <label htmlFor="good-words">Set some motivation words:</label>
                <input  className="form-control" 
                        type="text" 
                        value={goodWords} 
                        onChange={(event) => setGoodWords(event.target.value)} 
                        id="good-words"/>
            </div>
            <div className="form-group">
                <label htmlFor="rest-duration">Rest Duration <small>(seconds)</small>: </label>
                <input  className="form-control" 
                        type="number" 
                        value={restDuration} 
                        onChange={(event) => parseInt(event.target.value) > 0 && setRestDuration(parseInt(event.target.value))} 
                        id="rest-duration"/>
            </div>

            <FilePicker label="Choose media to present"
                        tabToShow={['Youtube','Videos','Images']}
                        onPick={(file:FileDetails) => setReletedVideo(file)}/>
            {
                reletedVideo && (
                    <FileElement    file={reletedVideo} 
                                    onRemove={() => setReletedVideo(undefined)}/>
                )
            }
            <br/>
            <br/>
            <br/>

            <div className="center">
                <button className="btn btn-navy lrg" onClick={() => handleSubmit()}>
                    {
                        props.editMode? <React.Fragment>Save Changes</React.Fragment>:
                        <React.Fragment>
                            <i className="fas fa-plus"></i>  Add to Workout plan
                        </React.Fragment>
                    }
                </button>

                {
                    props.editMode &&
                    <button className="btn btn-danger lrg" style={{color:'white'}} onClick={() => {
                        reset()
                    }}>Drop Changes</button>
                }
            </div>
        </div>
    )
}
