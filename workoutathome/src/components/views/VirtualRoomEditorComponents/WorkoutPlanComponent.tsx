import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import { WorkoutComponent, WorkoutTypes } from '../../../types/workout-plan';
import { FileElement } from '../../commons/FileElement';
import { Exercise } from '../../../types/exercise';
import { fetchChangesFromLocalStorage, REMOVE_WORKOUT_COMPONENT, SET_WORKOUT_COMPONENTS, REPLACE_POSITION_ON_WORKOUT_PLAN } from '../../../actions/virtual-room';
import { VirtualRoom } from '../../../types/virtual-room';
import { useRouter } from '../../../routers/useRouter';
import { Rest } from '../../../types/rest';

interface PropsState{
    components: WorkoutComponent[]
}



const mapStateToProps = (state:RootState) : PropsState => {
    return{
        components: state.virtualroomstate.workoutPlan.components
    }
}

interface Props extends PropsState {
    vertical?: boolean;
    onPick?: Function;
}

export default connect(mapStateToProps)((props: Props) => {
    const [components, setComponents] = React.useState(props.components || []);
    var init = React.useRef(false);
    const dispatch = useDispatch();
    const router = useRouter();
    React.useEffect(() => {
        var fetchedComponent:VirtualRoom = fetchChangesFromLocalStorage();

        if(!init.current){
            if(fetchedComponent != null) dispatch({type: SET_WORKOUT_COMPONENTS, payload:fetchedComponent.workoutPlan})
            init.current = true;

        } else {
            setComponents(props.components)
        }

    },[setComponents,props.components,dispatch])


    const hendleComponentType = (component: WorkoutComponent) => {
        if(!component.type) return null;
        switch(component.type){
            case WorkoutTypes.exersice:
                const exercise = component as Exercise;
                return(
                    <React.Fragment>
                        <div className="img-cover">
                            {exercise.attach? <FileElement file={exercise.attach}/> : <img src="/assets/svg/gym.svg" alt="workout"/>}
                            
                        </div>
                        <div className="workout-card_details"> 
                            <div>{exercise.name}</div>
                            {exercise.subTitle && <div>{exercise.subTitle}</div>}
                            <div>{exercise.duration} secs</div>
                        </div>
                    </React.Fragment>
                )
            case WorkoutTypes.rest:
                const rest = component as Rest;
                return(
                    <React.Fragment>
                        <div className="img-cover">
                            {rest.attach? <FileElement file={rest.attach}/> : <img src="/assets/svg/stopwatch.svg" alt="workout"/>}
                            
                        </div>
                        <div className="workout-card_details"> 
                            {rest.goodWords && <div>{rest.goodWords}</div>}
                            <div>Break for {rest.duration} secs</div>
                        </div>

                    </React.Fragment>
                )
            default:
                return null;
        }
    }
    return (
        <React.Fragment>
        {
            components.length > 0 &&
            <div className={`workout-plan ${props.vertical? 'vertical':''}`}>
                <ul>
                {
                    components && components.map((component: WorkoutComponent, index:number) => (
                        <li className="workout-plan_card" key={index}>
                            <div className="cover"  onClick={() => router.history.push('/editor/create/editcomponent/'+(index+1))}></div>
                            <div className="workout-card_actions" >
                                {
                                    index !== components.length-1 &&
                                    <i className="fas fa-exchange-alt" onClick={() => dispatch({type: REPLACE_POSITION_ON_WORKOUT_PLAN, payload: {source: index, target: index+1}})}></i>
                                }
                                <i className="fas fa-trash" onClick={() => dispatch({type: REMOVE_WORKOUT_COMPONENT, payload: index})}></i>

                            </div>
                            {
                                hendleComponentType(component)
                            }
                            <span className="workout-card_index">{index+1}</span>
                        </li>
                    ))
                }
                </ul>
            </div>
        }
        </React.Fragment>
    )
})