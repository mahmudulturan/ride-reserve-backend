import User from "./user.model";

// get all users service
const getUsersFromDB = async () => {
    // get all users
    const users = await User.find();
    return users;
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

export const userService = {
    getUsersFromDB,
    changeUserStatusOnDB,
    changeUserRoleOnDB
}