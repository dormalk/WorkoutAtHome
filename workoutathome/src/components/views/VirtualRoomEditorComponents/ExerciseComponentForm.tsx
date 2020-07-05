import React from 'react';
import { FilePicker } from '../../commons';
import { FileDetails } from '../../../types/file';
import { FileElement } from '../../commons/FileElement';
import { useDispatch } from 'react-redux';
import { updateWorkoutCompnent, addWorkoutCompnent } from '../../../actions/virtual-room';
import { Exercise } from '../../../types/exercise';
import { WorkoutTypes } from '../../../types/workout-plan';
import { useRouter } from '../../../routers/useRouter';
import { useLastLocation } from 'react-router-last-location';
import { matchPath } from 'react-router';

interface Props{
    exercise?: {
        component: Exercise,
        index: number
    };
    editMode?: boolean;
}

export default (props:Props) => {
    const [exersiceName, setExersiceName] = React.useState('');
    const [exersiceSubTitle, setExersiceSubTitle] = React.useState('');
    const [exersiceDuration, setExersiceDuration] = React.useState<number>(0);
    const [reletedVideo, setReletedVideo] = React.useState<FileDetails | null>(null);

    const router = useRouter();
    const lastLocation = useLastLocation()

    React.useEffect(() => {
        if(props.editMode && !!props.exercise){
            setExersiceDuration(props.exercise?.component.duration);
            setExersiceName(props.exercise.component.name);
            if(!!props.exercise.component.subTitle) setExersiceSubTitle(props.exercise.component.subTitle);
            if(!!props.exercise.component.attach)setReletedVideo(props.exercise.component.attach);
            else setReletedVideo(null)
        }
    },[props])

    const dispatch = useDispatch();
    const handleSubmit = () => {
        const newExersice: Exercise = {
            name: exersiceName,
            subTitle: exersiceSubTitle,
            duration: exersiceDuration,
            attach: reletedVideo as FileDetails,
            type: WorkoutTypes.exersice
        }
        reset()
        if(props.editMode && props.exercise?.index){
            handlePushBack()
            dispatch(updateWorkoutCompnent(newExersice,props.exercise?.index))
            
        }else{
            dispatch(addWorkoutCompnent(newExersice))
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
        setExersiceDuration(10);
        setExersiceName('');
        setExersiceSubTitle('');
        setReletedVideo(null);
    }

    return(
        <div>
            <h2>{props.editMode? 'Edit':'Add'} Exercise</h2>
            <div className="form-group">
                <label htmlFor="exersice-name">Exersice Name:</label>
                <input  className="form-control" 
                        type="text" 
                        value={exersiceName} 
                        onChange={(event) => setExersiceName(event.target.value)} 
                        id="exersice-name"/>
            </div>
            <div className="form-group">
                <label htmlFor="exersice-subtitle">Exersice Sub-Title:</label>
                <input  className="form-control" 
                        type="text" 
                        value={exersiceSubTitle} 
                        onChange={(event) => setExersiceSubTitle(event.target.value)} 
                        id="exersice-subtitle"/>
            </div>

            <div className="form-group">
                <label htmlFor="exersice-duration">Exersice Duration <small>(seconds)</small>: </label>
                <input  className="form-control" 
                        type="number" 
                        value={exersiceDuration} 
                        onChange={(event) => parseInt(event.target.value) > 0 && setExersiceDuration(parseInt(event.target.value))} 
                        id="exersice-duration"/>
            </div>

            <FilePicker label="Choose demo video"
                        tabToShow={['Youtube','Videos']}
                        onPick={(file:FileDetails) => {
                            if(file.type === 'youtube' || file.type === 'video') setReletedVideo(file);
                        }}/>
            {
                reletedVideo && (
                    <FileElement    file={reletedVideo} 
                                    onRemove={() => setReletedVideo(null)}/>
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
