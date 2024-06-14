import mongoose, { model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = model<IUser>("User", userSchema);

export default User;