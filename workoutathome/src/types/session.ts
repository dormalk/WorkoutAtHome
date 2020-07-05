import { VirtualRoom, Participent } from "./virtual-room";
import * as CryptoJS from 'crypto-js';
import {Error} from './error';

export enum SessionStatus {
    panding = 'panding',
    start = 'start',
    closed = 'close',
    not_found = 'not_found',
    miss_password = 'miss_password',
    wrong_password = 'wrong_password',
    room_full = 'room_full' 
}


export interface ISessionRoom{
    virtualRoom?: VirtualRoom;
    status?: SessionStatus;
}

export class SessionRoom implements ISessionRoom{
    virtualRoom?: VirtualRoom;
    status?: SessionStatus;
    webRtcController?: WebRtcController;


    checkPassword(password:string, encript: boolean) : boolean{
        const based64Pass = encript? CryptoJS.enc.Base64.parse(password).toString():password;
        if(!this.virtualRoom?.limitations) return true;
        else if(!this.virtualRoom.limitations.password) return true;
        else if(this.virtualRoom.limitations.password === based64Pass) return true;
        else return false;
    }

    addParticipent(participent: Participent){
        if(this.virtualRoom && !this.virtualRoom?.participents){
            this.virtualRoom.participents = [];
        }


        if(!!this.virtualRoom?.limitations?.participents){
            if(this.virtualRoom.participents.length + 1 <= this.virtualRoom.limitations?.participents){
                this.virtualRoom.participents.push(participent);
                return true;
            } else {
                return false;
            }
        }
        else {
            this.virtualRoom?.participents.push(participent);
            return true;
        }
    }

    removeParticipent(participentId: string){
        if(this.virtualRoom) this.virtualRoom.participents = this.virtualRoom?.participents.filter(part => part.uid !== participentId) || []; 
    }

    updateParticipent(particpent: Participent){
        if(!!this.virtualRoom){            
            this.virtualRoom.participents = this.virtualRoom.participents.map((part) => {
            if(part.uid === particpent.uid) part = particpent;
                return part;
            }); 
        }

    }

}


class WebRtcController {

} 