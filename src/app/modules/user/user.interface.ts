export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    address: string;
    phone?: string;
    isDeleted: boolean;
    status: 'activated' | 'blocked';
}