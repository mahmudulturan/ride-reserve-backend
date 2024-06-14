import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILoginInfo } from "./auth.interface";
import bcrypt from 'bcrypt';

// create user service
const createUserIntoDB = async (payload: IUser) => {

    const user = await User.create(payload);

    return user;
}


// login user service
const loginUser = async (payload: ILoginInfo) => {

    const user = await User.findOne({ email: payload.email });

    // if user not found throw error
    if (!user) {
        throw new Error("User not found");
    }

    // compare with the hashed password
    const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

    // if password not match throw error
    if (!isPasswordMatch) {
        throw new Error("Incorrect password");
    }

    return user;
}


export const authService = {
    createUserIntoDB,
    loginUser
};