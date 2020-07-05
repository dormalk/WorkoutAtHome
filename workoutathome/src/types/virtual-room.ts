import { WorkoutPlan } from "./workout-plan";
import { ImageDetails } from "./image-data";

export interface Limitations {
    password?: string;
    participents?: number;
}

export interface Participent{
    uid: string;
    name: string;
}
export interface VirtualRoom {
    roomName: string;
    brandName:string;
    roomId: string;
    logo?: ImageDetails;
    createBy: string;
    createAt: number;
    limitations?: Limitations;
    participents: Participent[];
    workoutPlan: WorkoutPlan;


}