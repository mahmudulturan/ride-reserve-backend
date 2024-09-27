import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// controller for get all bookings
const getAllBookings = catchAsync(async (req: Request, res: Response) => {

    // response data
    const data = await bookingService.getBookingsFromDb(req.query);

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

        return;
    }


    sendResponse(res, { success: true, status: httpStatus.OK, message: "Bookings retrieved successfully", data })
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



// controller for get my bookings
const getMyBookings = catchAsync(async (req: Request, res: Response) => {

    // response data
    const data = await bookingService.getMyBookingsFromDB(req.user._id);
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
        return;
    }


    sendResponse(res, { success: true, status: httpStatus.OK, message: "My Bookings retrieved successfully", data })
})


// controller for update a booking
const updateBooking = catchAsync(async (req: Request, res: Response) => {
    // update booking
    const data = await bookingService.updateABookingOnDb(req.params.id, req.body);
    // send response
    sendResponse(res, { success: true, status: httpStatus.OK, message: "Booking updated successfully", data })
})

// controller for cancel a booking
const cancelABooking = catchAsync(async (req: Request, res: Response) => {
    // cancel a booking
    const data = await bookingService.cancelABookingOnDb(req.params.id);
    // send response
    sendResponse(res, { success: true, status: httpStatus.OK, message: "Booking cancelled successfully", data })
})


// controller for update a booking status
const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
    // update a booking status
    const data = await bookingService.updateBookingStatusOnDb(req.params.id, req.body.status);
    // send response
    sendResponse(res, { success: true, status: httpStatus.OK, message: `Booking ${req.body.status} successfully`, data })
})

export const bookingController = {
    createBooking,
    getAllBookings,
    getMyBookings,
    updateBooking,
    cancelABooking,
    updateBookingStatus
}