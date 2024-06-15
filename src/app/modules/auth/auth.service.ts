import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILoginInfo } from "./auth.interface";
import bcrypt from 'bcrypt';
import configs from "../../configs";
import { generateJwtToken } from "./auth.utils";

// create user service
const createUserIntoDB = async (payload: IUser) => {

    const isUserExist = await User.findOne({ email: payload.email });

    // if user already exist throw error
    if (isUserExist) {
        throw new AppError(httpStatus.CONFLICT, "User already exist");
    }

    await User.create(payload);

    const user = await User.findOne({ email: payload.email });
    return user;
}


// login user service
const loginUser = async (payload: ILoginInfo) => {

    const user = await User.findOne({ email: payload.email }).select('+password');

    // if user not found throw error
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // compare with the hashed password
    const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

    // if password not match throw error
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }


    // generate access token
    const accessToken = generateJwtToken({ userId: String(user._id), role: user.role }, configs.access_token_secret as string, '1d');

    // generate refresh token
    const refreshToken = generateJwtToken({ userId: String(user._id), role: user.role }, configs.refresh_token_secret as string, '180d');

    const userWithoutPassword = await User.findOne({ email: payload.email });


    return { user: userWithoutPassword, accessToken, refreshToken };
}


export const authService = {
    createUserIntoDB,
    loginUser
};