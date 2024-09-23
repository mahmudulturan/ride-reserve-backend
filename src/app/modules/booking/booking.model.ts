import mongoose, { model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new mongoose.Schema<IBooking>({
    date: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled', 'completed'],
        default: 'pending'
    },
    nidOrPassport: {
        type: String,
        required: true
    },
    drivingLicense: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    accountNo: {
        type: String,
        required: true
    }
})


const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking