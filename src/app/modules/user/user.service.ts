import QueryBuilder from "../../builder/QueryBuilder";
import { IUser } from "./user.interface";
import User from "./user.model";

// get all users service
const getUsersFromDB = async () => {
    // get all users
    const usersQuery = new QueryBuilder(User.find(), {}).sort().paginate();

    const users = await usersQuery.modelQuery;
    const usersCount = await new QueryBuilder(User.find(), {}).getCount();
    
    return { users, usersCount };
}

// change user isBlocked status service
const changeUserStatusOnDB = async (userId: string, isBlocked: boolean) => {
    // change user isBlocked
    const user = await User.findByIdAndUpdate(userId, { isBlocked }, { new: true });
    return user;
}

// change user role service
const changeUserRoleOnDB = async (userId: string, role: string) => {
    // change user role
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    return user;
}


// update user information service
const updateUserInformationOnDB = async (userId: string, payload: IUser) => {
    // update user information
    const user = await User.findByIdAndUpdate(userId, payload, { new: true });
    return user;
}

export const userService = {
    getUsersFromDB,
    changeUserStatusOnDB,
    changeUserRoleOnDB,
    updateUserInformationOnDB
}