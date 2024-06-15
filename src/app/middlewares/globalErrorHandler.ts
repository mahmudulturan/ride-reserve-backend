import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interfaces/error";
import { MongooseError } from "mongoose";
import configs from "../configs";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let status = 500;
    let message = 'something went wrong';

    let errorMessages: TErrorSources = [
        {
            path: "",
            message: ""
        }
    ]

    if (err instanceof ZodError) {
        const simplifiedZodError = handleZodError(err);
        errorMessages = simplifiedZodError.errorSources;
        status = simplifiedZodError.statusCode;
        message = simplifiedZodError.message;
    } else if (err.name === 'ValidationError') {
        const simplifiedMongooseError = handleValidationError(err);
        errorMessages = simplifiedMongooseError.errorSources;
        status = simplifiedMongooseError.statusCode;
        message = simplifiedMongooseError.message;
    }

    res.status(status).send({
        success: false,
        message,
        errorMessages,
        stack: configs.node_env === "development" ? err.stack : null,
        err
    })
}

export default globalErrorHandler;