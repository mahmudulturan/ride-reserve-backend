import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { carService } from "./car.service";
import httpStatus from "http-status";

const createCar = catchAsync(async (req: Request, res: Response) => {
    // create car
    const result = await carService.createCarIntoDb(req.body);

    // send response
    sendResponse(res,
        {
            status: httpStatus.CREATED,
            success: true,
            message: "Car created successfully",
            result: result
        })
})


export const carController = {
    createCar
};