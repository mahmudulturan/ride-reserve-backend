import { Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import configs from "../../configs";

const createUser = catchAsync(async (req: Request, res: Response) => {
    // create user
    const data = await authService.createUserIntoDB(req.body);

    // send response
    sendResponse(res,
        {
            status: httpStatus.CREATED,
            success: true,
            message: "User created successfully",
            data
        })

})

const loginUser = catchAsync(async (req: Request, res: Response) => {
    // login user
    const { accessToken, user, refreshToken } = await authService.loginUser(req.body);


    res.cookie("refreshToken", refreshToken, { secure: configs.node_env === "production", httpOnly: true, maxAge: 180 * 24 * 60 * 60 * 1000 })

    res.status(httpStatus.OK).send({
        success: true,
        message: "User logged in successfully",
        data: user,
        token: accessToken
    })


});

const getUser = (req: Request, res: Response) => {
    res.status(httpStatus.OK).send({
        success: true,
        message: "User retrieved successfully",
        data: req.user
    })
};

export const authController = {
    createUser,
    loginUser,
    getUser
}