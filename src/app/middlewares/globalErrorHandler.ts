import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = 500;
    const message = err.message || 'something went wrong';

    res.status(status).send({
        success: false,
        message,
        errorMessage: [],
        stack: null
    })
}

export default globalErrorHandler;