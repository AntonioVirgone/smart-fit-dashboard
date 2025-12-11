export interface Customer {
    id: string;
    name: string;
    password: string;
    activationCode: string;
    phone: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    trainerId?: string;
}
