import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interfaces/error";
import configs from "../configs";
import handleValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicatError";
import handleCastError from "../errors/handleCastError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let status = 500;
    let message = 'Something Went Wrong';
    let errorMessages: TErrorSources = [
        {
            path: "",
            message: ""
        }
    ]

    if (err instanceof ZodError) {                               // handle zod error 
        const simplifiedZodError = handleZodError(err);
        errorMessages = simplifiedZodError.errorSources;
        status = simplifiedZodError.statusCode;
        message = simplifiedZodError.message;
    } else if (err.name === 'ValidationError') {                 // handle mongoose validation error
        const simplifiedMongooseError = handleValidationError(err);
        errorMessages = simplifiedMongooseError.errorSources;
        status = simplifiedMongooseError.statusCode;
        message = simplifiedMongooseError.message;
    } else if (err.code === 11000) {                             // handle duplicate error with code 1000
        const simplifiedDuplicateError = handleDuplicateError(err);
        status = simplifiedDuplicateError?.statusCode;
        message = simplifiedDuplicateError?.message;
        errorMessages = simplifiedDuplicateError?.errorSources;
    } else if (err.name === "CastError") {                      // handle cast error
        const simplifiedCastError = handleCastError(err);
        status = simplifiedCastError?.statusCode;
        message = simplifiedCastError?.message;
        errorMessages = simplifiedCastError?.errorSources;
    } else if (err instanceof AppError) {                   // handle custom app error
        status = err.statusCode;
        message = err?.message;
        errorMessages = [
            {
                path: '',
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {  // handle default error
        message = err?.message;
        errorMessages = [
            {
                path: '',
                message: err?.message,
            },
        ];
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