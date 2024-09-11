import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

// controller for get all users
const getAllUser = catchAsync(async (req: Request, res: Response) => {
    // get all users
    const data = await userService.getUsersFromDB();

    if (data.length === 0) {
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

export const userController = {
    getAllUser,
    updateUserStatus
}