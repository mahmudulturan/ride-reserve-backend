import mongoose from "mongoose"

export interface IPayment {
    amount: number;
    currency: string;
    booking: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
}