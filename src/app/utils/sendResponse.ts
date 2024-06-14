import { Response } from "express";

type TResponse<T> = {
    success: boolean;
    status: number;
    message: string;
    result: T;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.status).send({
        success: data.success,
        message: data.message,
        data: data.result
    });
}

export default sendResponse;