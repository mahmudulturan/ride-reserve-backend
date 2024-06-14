import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'something went wrong';

    res.status(status).send({
        success: false,
        message,
        errorMessage: [],
        stack: null
    })
}

export default globalErrorHandler;