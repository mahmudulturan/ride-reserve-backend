import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

// controller for get all users
const getAllUser = catchAsync(async (req: Request, res: Response) => {
    // get all users
    const data = await userService.getUsersFromDB();

    if (data.users.length === 0) {
        // send response
        sendResponse(res,
            {
                status: httpStatus.NOT_FOUND,
                success: true,
                message: "No Data Found",
                data
            })
    };

    // send response
    sendResponse(res, { success: true, status: httpStatus.OK, message: "Users retrieved successfully", data })
})


// controller for update user isBlocked status
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    // update user isBlocked status
    const data = await userService.changeUserStatusOnDB(req.params.id, req.body.isBlocked);
    // send response
    sendResponse(res, { success: true, status: httpStatus.OK, message: "User status updated successfully", data })
})


// controller for update user role
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
    // update user role
    const data = await userService.changeUserRoleOnDB(req.params.id, req.body.role);
    // send response
    sendResponse(res, { success: true, status: httpStatus.OK, message: "User role updated successfully", data })
});

// controller for update user information
const updateUserInformation = catchAsync(async (req: Request, res: Response) => {
    // update user information
    const data = await userService.updateUserInformationOnDB(req.params.id, req.body);
    // send response
    sendResponse(res, { success: true, status: httpStatus.OK, message: "User information updated successfully", data })
});

export const userController = {
    getAllUser,
    updateUserStatus,
    updateUserRole,
    updateUserInformation
}