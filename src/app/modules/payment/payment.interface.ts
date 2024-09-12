import { Types } from "mongoose"

export interface IPayment {
    amount: number;
    currency: string;
    booking: Types.ObjectId;
    user: Types.ObjectId;
}