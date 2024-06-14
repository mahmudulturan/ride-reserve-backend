import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { carService } from "./car.service";
import httpStatus from "http-status";

// controller for create car
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


// controller for get all cars
const getAllCars = catchAsync(async (req: Request, res: Response) => {
    // get all cars
    const result = await carService.getAllCarsFromDb();

    // send response
    sendResponse(res,
        {
            status: httpStatus.OK,
            success: true,
            message: "Cars retrieved successfully",
            result: result
        })
})


export const carController = {
    createCar,
    getAllCars
};