import { Types } from "mongoose";

export interface IBooking {
    date: string;
    user: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime: string;
    totalCost: number;
    status: 'pending' | 'approved' | 'cancelled' | 'completed';
    nidOrPassport: string;
    drivingLicense: string;
    paymentMethod: string;
    accountNo: string;
    createdAt: Date;
}