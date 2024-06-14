import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.createUserIntoDB(req.body);

        sendResponse(res,
            {
                status: httpStatus.CREATED,
                success: true,
                message: "User created successfully",
                result
            })
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.loginUser(req.body);

        sendResponse(res,
            {
                status: httpStatus.OK,
                success: true,
                message: "User logged in successfully",
                result
            });
    } catch (error) {
        next(error);
    }
}

export const authController = {
    createUser,
    loginUser
}