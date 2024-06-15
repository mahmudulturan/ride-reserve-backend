import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBooking = catchAsync((req: Request, res: Response) => {
    const reqData = { ...req.body, user: req.user.userId }
    console.log(reqData)
    const data = bookingService.createBookingIntoDb(reqData);

    sendResponse(res, { success: true, status: httpStatus.ACCEPTED, message: "Car booked successfully", data })
})


export const bookingController = {
    createBooking
}