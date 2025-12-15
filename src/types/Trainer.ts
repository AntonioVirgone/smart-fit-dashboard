import type {Customer} from "./Customer.ts";

export interface Trainer {
    id: string;
    name: string;
    email: string;
    customers?: Customer[];
    password: string;
    createdAt: string;
}
