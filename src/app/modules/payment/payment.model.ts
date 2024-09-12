import mongoose from "mongoose";
import { IPayment } from "./payment.interface";

const modelSchema = new mongoose.Schema<IPayment>({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    transactionId: {
        type: String
    }
});


const Payment = mongoose.model<IPayment>('Payment', modelSchema);


export default Payment;