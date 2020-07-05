import React from 'react';
import { FilePicker } from '../../commons';
import { FileDetails } from '../../../types/file';
import { FileElement } from '../../commons/FileElement';
import { RootState } from '../../../store/configureStore';
import { VirtualRoom } from '../../../types/virtual-room';
import {connect, useDispatch} from 'react-redux';
import { UPDATE_VIRTUAL_ROOM_DATA } from '../../../actions/virtual-room';

interface PropsState{
    virutalRoomState: VirtualRoom
}

const mapStateToProps = (state:RootState) : PropsState => {
    return{
        virutalRoomState: state.virtualroomstate
    }
}


export default connect(mapStateToProps)((props: PropsState) => {

    const dispatch = useDispatch();

    const hendleUpdate = (update:any) => {

        const updateRoom = {
            ...props.virutalRoomState,
            ...update
        }
        console.log(updateRoom)
        dispatch({type: UPDATE_VIRTUAL_ROOM_DATA, payload: updateRoom})

    }

    return(
        <div>
            <h2>General Configurations</h2>
            <div className="form-group">
                <label htmlFor="room-name">Room's Name:</label>
                <input  className="form-control" 
                        type="text" 
                        value={props.virutalRoomState.roomName} 
                        onChange={(event) => hendleUpdate({roomName: event.target.value})} 
                        id="room-name"/>
            </div>

            <div className="form-group">
                <label htmlFor="brand-name">Brand's Name:</label>
                <input  className="form-control" 
                        type="text" 
                        value={props.virutalRoomState.brandName} 
                        onChange={(event) => hendleUpdate({brandName: event.target.value})} 
                        id="brand-name"/>
            </div>
            <FilePicker onPick={(file:FileDetails) => hendleUpdate({logo: file})}
                        label="Pick branded logo"
                        tabToShow={['Images']}/>

            {
                props.virutalRoomState.logo && (
                <FileElement    file={props.virutalRoomState.logo} 
                                onRemove={() => hendleUpdate({logo: null})}/>
                )
            }

        </div>
    )
})
