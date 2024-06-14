import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
    // create user
    const result = await authService.createUserIntoDB(req.body);

    // send response
    sendResponse(res,
        {
            status: httpStatus.CREATED,
            success: true,
            message: "User created successfully",
            result: result
        })

})

const loginUser = catchAsync(async (req: Request, res: Response) => {
    // login user
    const result = await authService.loginUser(req.body);

    // send response
    sendResponse(res,
        {
            status: httpStatus.OK,
            success: true,
            message: "User logged in successfully",
            result
        });
})

export const authController = {
    createUser,
    loginUser
}