import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { carService } from "./car.service";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

// controller for create car
const createCar = catchAsync(async (req: Request, res: Response) => {
    // create car
    const data = await carService.createCarIntoDb(req.body);

    // send response
    sendResponse(res,
        {
            status: httpStatus.CREATED,
            success: true,
            message: "Car created successfully",
            data
        })
})


// controller for get all cars
const getAllCars = catchAsync(async (req: Request, res: Response) => {
    // get all cars
    const data = await carService.getAllCarsFromDb();

    // if no data found then send error response
    if (data.length === 0) {
        // send response
        sendResponse(res,
            {
                status: httpStatus.NOT_FOUND,
                success: true,
                message: "No Data Found",
                data
            })
    }

    // send response
    sendResponse(res,
        {
            status: httpStatus.OK,
            success: true,
            message: "Cars retrieved successfully",
            data
        })
})


// controller for get a car
const getACar = catchAsync(async (req: Request, res: Response) => {
    // get a car by _id
    const data = await carService.getACarFromDb(req.params.id);

    // if no data found then send error response
    if (!data) {
        // send response
        sendResponse(res,
            {
                status: httpStatus.NOT_FOUND,
                success: true,
                message: "No Data Found",
                data
            })
    }

    // send response
    sendResponse(res,
        {
            status: httpStatus.OK,
            success: true,
            message: "A Car retrieved successfully",
            data
        })
})


// controller for get highest price car
const getHighestPriceCar = catchAsync(async (req: Request, res: Response) => {
    // get highest price car
    const data = await carService.getHighestPriceCarFromDb();

    // send response
    sendResponse(res,
        {
            status: httpStatus.OK,
            success: true,
            message: "Highest Price Car retrieved successfully",
            data
        })
})

// controller for update a car
const updateACar = catchAsync(async (req: Request, res: Response) => {
    // update a car by _id
    const data = await carService.updateACarFromDb(req.params.id, req.body);

    // send response
    sendResponse(res,
        {
            status: httpStatus.OK,
            success: true,
            message: "Car updated successfully",
            data
        })
})


// controller for delete a car
const deleteACar = catchAsync(async (req: Request, res: Response) => {
    // delete a car by _id
    const data = await carService.deleteACarFromDb(req.params.id);

    // send response
    sendResponse(res,
        {
            status: httpStatus.OK,
            success: true,
            message: "Car Deleted successfully",
            data
        });
});

// controller for return car
const returnCar = catchAsync(async (req: Request, res: Response) => {

    // response data
    const data = await carService.returnCarWithDb(req.body);
    sendResponse(res, { success: true, status: httpStatus.OK, message: "Car returned successfully", data })
})



export const carController = {
    createCar,
    getAllCars,
    getACar,
    updateACar,
    deleteACar,
    returnCar,
    getHighestPriceCar
};