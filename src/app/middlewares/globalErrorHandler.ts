import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interfaces/error";
import { MongooseError } from "mongoose";
import configs from "../configs";

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
    } else if (err instanceof MongooseError) {
        console.log('orree eda tw mongoose er error')
    }

    res.status(status).send({
        success: false,
        message,
        errorMessages,
        stack: configs.node_env === "development" ? err.stack : null,
    })
}

export default globalErrorHandler;