import type {Exercise} from "./Exercise.ts";

export interface Plan {
    id: string;
    name: string;
    planExercises: PlanExercises[];
}

export interface PlanExercises {
    exercise: Exercise;
}