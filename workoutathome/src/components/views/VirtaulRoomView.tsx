import React from 'react';
import { SessionRoom, SessionStatus } from '../../types/session';
import { initializedFirebase } from '../../configs/firebase';
import { participentMock } from '../../mocks/particepent';
import VirtualRoomOn from './VirtualRoomView/VirtualRoomOn';
import { VirtualRoomController } from './VirtualRoomView/VirtualRoomController';





export default class VirtualRoomView extends VirtualRoomController{

    useQuery() {
        return new URLSearchParams(window.location.search);
    }
    
    query = this.useQuery();
    componentDidMount(){
        const roomId = this.query.get('id')
        const pw = this.query.get('pw');
        //Init
        this.init(roomId || '', pw || '');

    }

    init(roomId:string, pw:string){
        this.setState({loading: true})
        initializedFirebase.database().ref('sessions/'+roomId)
        .once('value',(snapshot) => {
            let sessionRoom = new SessionRoom()
            if(!snapshot.exists()){
                sessionRoom.status = SessionStatus.not_found;
                this.setState({sessionRoom: sessionRoom, loading: false})
            } else {
                sessionRoom.virtualRoom = snapshot.val().virtualRoom
                this.validationLimits(sessionRoom, pw)
            }

        },(err:any) => console.error(err))
    }

    validationLimits = (sessionRoom: SessionRoom, pw:string) => {
        let error = false;
        if(sessionRoom.virtualRoom?.limitations?.password) {
            if(!sessionRoom.checkPassword(pw || '',pw !== this.query.get('pw'))) {
                sessionRoom.status = SessionStatus.wrong_password;
                error = true;
            }
        }         
        if(!error && !sessionRoom.addParticipent(participentMock)){
            sessionRoom.status = SessionStatus.room_full;
        }
        this.updateFirebaseSession(sessionRoom);
    }

    render(){
        const { sessionRoom,loading } = this.state; 
        return(
            <div>
                {
                    loading?
                    <Loading/>:
                    sessionRoom?.status === SessionStatus.wrong_password?
                    <PasswordInput onSubmit={(password:string) => this.validationLimits(sessionRoom,password)}/>:
                    <VirtualRoomOn  sessionRoom={sessionRoom}
                                    updateFirebaseSession={(sessionRoom: SessionRoom)=>this.updateFirebaseSession(sessionRoom)}/>

                }
            </div>
        )
    }
}



const Loading = () => (<div className="loading"><h2>Please wait until we connect</h2></div>)


const PasswordInput = ({onSubmit}:any) => {
    const [password, setPassword] = React.useState('');
    return(
        <React.Fragment>
            <h3>Please set a password and then press Submit to connect to Room</h3>
            <div className="form-group">
                <input className="form-control" value={password} type="password" onChange={(event) => setPassword(event.target.value)}/>

                <button className="btn btn-navy lrg" onClick={() =>onSubmit(password)}>Submit</button>
            </div>
        </React.Fragment>
       
    )
}