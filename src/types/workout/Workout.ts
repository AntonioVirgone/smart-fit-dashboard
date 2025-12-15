import type {Plan} from "./Plan.ts";

export interface Workout {
    id: string;
    name: string;
    workoutPlans: WorkoutPlans[];
}

export interface WorkoutPlans {
    id: string;
    workoutId: string;
    planId: string;
    plan: Plan;
}