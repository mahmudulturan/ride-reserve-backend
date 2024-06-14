import mongoose, { model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new mongoose.Schema<IBooking>({
    date: {
        type: Date,
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
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    }
})


const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking