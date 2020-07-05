import { FileDetails } from "./file";
import { WorkoutComponent } from "./workout-plan";

export interface Exercise extends WorkoutComponent{
    name: string;
    subTitle?: string;
    duration: number;
    attach: FileDetails;
}