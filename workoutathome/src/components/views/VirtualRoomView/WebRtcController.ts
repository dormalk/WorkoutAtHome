import {initializedFirebase} from '../../../configs/firebase';
import 'webrtc';

const querySelector = (query:any):any =>{
    return document.querySelector(query)
}

const configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

export class WebRtcController{
    peerConnection = new RTCPeerConnection(configuration);
    localStream : MediaStream | null= null;
    remoteStream : MediaStream | null = null;
    roomDialog = null;
    roomId : string | null = null;
    
    constructor(roomId:string | null){
        querySelector('#cameraBtn').addEventListener('click', this.openUserMedia);
        querySelector('#hangupBtn').addEventListener('click', this.hangUp);
        console.log(roomId)
        this.roomId = roomId;
        if(roomId) {
            this.openUserMedia();
            this.joinRoomById(roomId);
        }
    }


    async openUserMedia() {
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        querySelector('#localVideo').srcObject = stream;
        this.localStream = stream;
        this.remoteStream = new MediaStream();      
        console.log('Stream:', querySelector('#localVideo').srcObject);


        querySelector('#cameraBtn').disabled = true;
        querySelector('#joinBtn').disabled = false;
        querySelector('#createBtn').disabled = false;
        querySelector('#hangupBtn').disabled = false;
    }

    async hangUp() {
        const tracks = (document.querySelector('#localVideo') as any).srcObject.getTracks();
        tracks.forEach((track:any) => {
          track.stop();
        });
      
        if (this.remoteStream) {
          this.remoteStream.getTracks().forEach(track => track.stop());
        }
      
        if (this.peerConnection) {
          this.peerConnection.close();
        }
      
        querySelector('#cameraBtn').disabled = false;
        querySelector('#hangupBtn').disabled = true;
      
        // Delete room on hangup
        if (this.roomId) {
          const db = initializedFirebase.firestore();
          const roomRef = db.collection('rooms').doc(this.roomId);
          const calleeCandidates = await roomRef.collection('calleeCandidates').get();
          calleeCandidates.forEach(async (candidate : any) => {
            await candidate.delete();
          });
          const callerCandidates = await roomRef.collection('callerCandidates').get();
          callerCandidates.forEach(async (candidate:any) => {
            await candidate.delete();
          });
          await roomRef.delete();
        }
      
        querySelector('#localVideo').srcObject = null;
        querySelector('#remoteVideo').srcObject = null;
        querySelector('#cameraBtn').disabled = false;
        querySelector('#joinBtn').disabled = true;
        querySelector('#createBtn').disabled = true;
        querySelector('#hangupBtn').disabled = true;
        querySelector('#currentRoom').innerText = '';

        document.location.reload(true);
    }

    async joinRoomById(roomId:string) {
        const db = initializedFirebase.firestore();
        const roomRef = db.collection('rooms').doc(`${roomId}`);
        const roomSnapshot = await roomRef.get();
        console.log('Got room:', roomSnapshot.exists);
      
        if (roomSnapshot.exists) {
          console.log('Create PeerConnection with configuration: ', configuration);
          this.peerConnection = new RTCPeerConnection(configuration);
          this.registerPeerConnectionListeners();
          if(this.localStream != null){              
              this.localStream.getTracks().forEach(track => {
                  if(this.localStream != null) this.peerConnection.addTrack(track,this.localStream);
              });
          }
      
          // Code for collecting ICE candidates below
      
          // Code for collecting ICE candidates above
      
          this.peerConnection.addEventListener('track', event => {
                console.log('Got remote track:', event.streams[0]);
                event.streams[0].getTracks().forEach(track => {
                console.log('Add a track to the remoteStream:', track);
                if(this.remoteStream) this.remoteStream.addTrack(track);
            });
          });
      
          // Code for creating SDP answer below
      
          // Code for creating SDP answer above
      
          // Listening for remote ICE candidates below
      
          // Listening for remote ICE candidates above
        }
    }
      
    registerPeerConnectionListeners() {
        console.log(this.peerConnection)
        this.peerConnection.addEventListener('icegatheringstatechange', () => {
            console.log(
                `ICE gathering state changed: ${this.peerConnection.iceGatheringState}`);
        });
        
        this.peerConnection.addEventListener('connectionstatechange', () => {
            console.log(`Connection state change: ${this.peerConnection.connectionState}`);
        });
        
        this.peerConnection.addEventListener('signalingstatechange', () => {
            console.log(`Signaling state change: ${this.peerConnection.signalingState}`);
        });
        
        this.peerConnection.addEventListener('iceconnectionstatechange ', () => {
            console.log(
                `ICE connection state change: ${this.peerConnection.iceConnectionState}`);
        });
    }
      
}