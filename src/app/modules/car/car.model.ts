import mongoose, { model } from "mongoose";
import { ICar } from "./car.interface";

const carSchema = new mongoose.Schema<ICar>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    isElectric: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}
    , { timestamps: true });


const Car = model<ICar>("Car", carSchema);

export default Car;