import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interfaces/error";
import configs from "../configs";
import handleValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicatError";
import handleCastError from "../errors/handleCastError";

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
    } else if (err.code === 11000) {
        const simplifiedDuplicateError = handleDuplicateError(err);
        status = simplifiedDuplicateError?.statusCode;
        message = simplifiedDuplicateError?.message;
        errorMessages = simplifiedDuplicateError?.errorSources;
    } else if (err.name === "CastError") {
        const simplifiedCastError = handleCastError(err);
        status = simplifiedCastError?.statusCode;
        message = simplifiedCastError?.message;
        errorMessages = simplifiedCastError?.errorSources;
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