import mongoose, { model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt'
import configs from "../../configs";

// user schema
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

// make sure password is hashed before saving to db
userSchema.pre("save", async function (next) {
    const user = this as IUser;

    // hash password
    user.password = await bcrypt.hash(user.password, Number(configs.salt_rounds));

    next();
})

// user model
const User = model<IUser>("User", userSchema);

export default User;

