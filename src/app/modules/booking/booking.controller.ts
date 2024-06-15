import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// controller for get all bookings
const getAllBookings = catchAsync(async (req: Request, res: Response) => {

    // response data
    const data = await bookingService.getBookingsFromDb();

    sendResponse(res, { success: true, status: httpStatus.ACCEPTED, message: "Bookings retrieved successfully", data })
})


// controller for create booking
const createBooking = catchAsync(async (req: Request, res: Response) => {

    // prepare data for call the service
    const { carId, ...otherInfo } = req.body;
    const reqData = { car: carId, user: req?.user?.userId, ...otherInfo }

    // response data
    const data = await bookingService.createBookingIntoDb(reqData);

    sendResponse(res, { success: true, status: httpStatus.ACCEPTED, message: "Car booked successfully", data })
})


export const bookingController = {
    createBooking,
    getAllBookings
}