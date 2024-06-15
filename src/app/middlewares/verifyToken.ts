import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import configs from "../configs";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import User from "../modules/user/user.model";

type TRole = 'user' | 'admin';

const verifyToken = (...requiredRole: TRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
        }

        try {
            const decoded = jwt.verify(token, configs.access_token_secret as string) as JwtPayload;

            const { userId, role } = decoded;

            const user = await User.findById(userId);

            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
            }
            const isMatchedRole = requiredRole.includes(role);

            if (!isMatchedRole) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
            };

            req.user = decoded as JwtPayload;
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }
        next();
    })
}

export default verifyToken;