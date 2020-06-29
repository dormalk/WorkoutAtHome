interface Limitations {
    password: string;
    participents: Number;
}

interface Participent{
    uid: string;
    name: string;
}
export interface VirtualRoom {
    roomName: string;
    roomId: string;
    logoSrc: string;
    createBy: string;
    createAt: Number;
    limitations: Limitations;
    participents: Participent[];
}