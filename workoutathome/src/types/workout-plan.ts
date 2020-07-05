
export enum WorkoutTypes{
    exersice = "exercise",
    rest = 'rest'
}

export interface WorkoutComponent{
    type:WorkoutTypes;
}

export interface WorkoutPlan {
    components: WorkoutComponent[];
}