import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.createUserIntoDB(req.body);
        res.status(httpStatus.CREATED).send({
            success: true,
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.loginUser(req.body);
        res.status(httpStatus.OK).send({
            success: true,
            message: "User logged in successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const authController = {
    createUser,
    loginUser
}