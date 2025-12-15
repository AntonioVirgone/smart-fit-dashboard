export interface Exercise {
    id: string;
    planId: string;
    name: string;
    description: string;
    imageName: string;
    muscleGroup: string;
    sets: number;
    repetitions: number;
    recovery: number;
    instructions: string[];
}