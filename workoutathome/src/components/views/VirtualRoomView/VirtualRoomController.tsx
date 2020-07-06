import React from 'react';
import { SessionRoom, ISessionRoom } from '../../../types/session';
import { initializedFirebase } from '../../../configs/firebase';
interface SessionState{
    sessionRoom?: SessionRoom;
    loading: Boolean;
}



export class VirtualRoomController extends React.Component<any,SessionState>{
    constructor(props:any){
        super(props)
        this.state = {
            sessionRoom: undefined,
            loading: true
        }

    }


    updateFirebaseSession(sessionRoom: SessionRoom){
        let updatedSession : ISessionRoom = {
            virtualRoom: sessionRoom.virtualRoom
        };

        initializedFirebase.database().ref('sessions/'+sessionRoom.virtualRoom?.roomId)
        .set(updatedSession)
        .then(() => {
            this.setState({sessionRoom: sessionRoom, loading: false})
        })
    }

}