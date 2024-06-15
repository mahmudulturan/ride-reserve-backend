import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Car from "../car/car.model";
import { IBooking } from "./booking.interface";
import Booking from "./booking.model";
import mongoose from "mongoose";


// get all booking service
const getBookingsFromDb = async (query: Record<string, any>) => {
    const queryObject: { date?: string, car?: string } = {};

    const { date, carId } = query;

    // add query in queryObject
    if (date) {
        queryObject['date'] = date;
    };

    // add query in queryObject
    if (carId) {
        queryObject['car'] = carId;
    };

    // get all bookings by queyObject
    const bookings = await Booking.find(queryObject);
    return bookings;
}

// create booking service
const createBookingIntoDb = async (payload: IBooking) => {

    // const session = await mongoose.startSession();

    try {
        // session.startTransaction();

        const car = await Car.findByIdAndUpdate(payload.car, { status: "unavailable" }, { new: true });

        if (!car) {
            throw new AppError(httpStatus.NOT_FOUND, "Car Not Found");
        }

        const newBooking = await Booking.create(payload);

        console.log(newBooking);

        // await session.commitTransaction();
        // await session.endSession();
        return newBooking;
    } catch (error) {
        // await session.abortTransaction();
        // await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "Booking Failed");
    }


}



// get my bookings service
const getMyBookingsFromDB = async (userId: string) => {
    console.log(userId)
    // get my bookings by user id
    const bookings = await Booking.find({ user: userId });
    return bookings;
}



export const bookingService = {
    createBookingIntoDb,
    getBookingsFromDb,
    getMyBookingsFromDB
}