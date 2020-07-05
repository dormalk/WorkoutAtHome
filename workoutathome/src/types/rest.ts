import { WorkoutComponent } from "./workout-plan";
import { FileDetails } from "./file";

export interface Rest extends WorkoutComponent{
    goodWords?: string;
    attach?: FileDetails;
    duration: number;
}