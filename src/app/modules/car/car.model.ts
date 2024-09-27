import mongoose, { Schema } from "mongoose";
import { ICar } from "./car.interface";

const carSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    totalPassengers: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    totalDoors: {
        type: Number,
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
    carType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    },
    features: {
        type: [String],
        required: true
    },
    additionalFeatures: {
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
}, { timestamps: true });

const Car = mongoose.model<ICar>("Car", carSchema);

export default Car;