import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { VirtualRoom } from '../../../types/virtual-room';
import { RootState } from '../../../store/configureStore';
import { FileElement } from '../../commons/FileElement';
import WorkoutPlanComponent from './WorkoutPlanComponent';
import { Checkbox } from '../../commons';
import { updateWorkoutLimitation } from '../../../actions/virtual-room';
import { initializedFirebase } from '../../../configs/firebase';
import { useRouter } from '../../../routers/useRouter';
import * as CryptoJS from 'crypto-js';


interface PropsState {
    virtualRoom: VirtualRoom
}


const mapStateToProps = (state:RootState):PropsState => ({
    virtualRoom: state.virtualroomstate
})

export default connect(mapStateToProps)((props:PropsState) => {
    const [checkedTemplate, setCheckedTemplate] = React.useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = () => {
        let password = props.virtualRoom.limitations?.password ||  '';
        if(password !== '' && props.virtualRoom.limitations) {
            password = CryptoJS.enc.Base64.parse(password).toString()
            props.virtualRoom.limitations.password = password;
        }
        
        initializedFirebase.database()
        .ref('sessions/'+props.virtualRoom.roomId)
        .set({virtualRoom: props.virtualRoom})
        .then(() => {
            if(password !== '') password = '&pw='+password;
            router.push('/virtualroom?id='+props.virtualRoom.roomId+password)
        })
    }

    return(
        <div id="overview-page">
            <h2>Overview</h2>
            <div className="container row space-between">
                <div>
                    <h3>Room details</h3>
                    <section>
                        <u>Room Name:</u> {props.virtualRoom.roomName} <br/>
                        <u>Room Brand Name:</u> {props.virtualRoom.brandName} <br/>
                        {
                            props.virtualRoom.logo &&
                            <React.Fragment>
                                <u>Room Logo:</u>
                                <FileElement file={props.virtualRoom.logo}/><br/>
                            </React.Fragment> 
                        } 
                        <u>Room Id:</u> <span className="hightlight">{props.virtualRoom.roomId}</span>
                        <br/><br/>
                        {
                            props.virtualRoom.limitations &&
                            <React.Fragment>
                                <h3>Limitations <i className="fas fa-trash" onClick={() => dispatch(updateWorkoutLimitation(null))}></i></h3> 
                                <u>Participents limits:</u> {props.virtualRoom.limitations.participents} <br/>
                                <u>password:</u> {props.virtualRoom.limitations.password? 'Yes':'No'} <br/>
                            </React.Fragment>
                        }
                        <br/>
                        <Checkbox label="Set as a template" checked={checkedTemplate} onChange={(value:boolean) => setCheckedTemplate(value)}/>
                        <br/><br/><br/>
                        <button className="btn btn-navy lrg" onClick={() => onSubmit()}>Create the room</button>
                    </section>
                </div>
                <div>
                    <h3>Workout Plan</h3>
                    <WorkoutPlanComponent vertical={true}/>
                </div>
            </div>
        </div>
    )
})