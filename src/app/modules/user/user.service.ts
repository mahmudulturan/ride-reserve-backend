import User from "./user.model";

const getUsersFromDB = async () => {
    // get all users
    const users = await User.find();
    return users;
}

export const userService = {
    getUsersFromDB
}