import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const createUserIntoDB = async (payload: IUser) => {

    const user = await User.create(payload);

    return user;
}


export const authService = {
    createUserIntoDB
};