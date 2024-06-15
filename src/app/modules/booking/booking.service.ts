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
    const bookings = await Booking.find(queryObject).populate("user").populate("car");
    return bookings;
}

// create booking service
const createBookingIntoDb = async (payload: IBooking) => {


    const car = await Car.findOne({ _id: payload.car, isDeleted: false });

    // if car not available then throw an error
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, "Car Not Found");
    }

    // if car's status is not available then throw an error
    if (car?.status == "unavailable") {
        throw new AppError(httpStatus.NOT_FOUND, "Car is unavailable");
    }


    // create a session
    const session = await mongoose.startSession();

    try {
        // start transaction
        session.startTransaction();

        // change car status
        car.status = "unavailable"
        await car.save({ session });

        // new booking create
        const newBooking = await Booking.create([payload], { session });

        // commit transaction and end session
        await session.commitTransaction();
        await session.endSession();

        // populate all referencing data
        const bookingData = await Booking.findById(newBooking[0]._id).populate("user").populate("car")

        return bookingData;
    } catch (error) {
        // if error caught then abroat the transaction and endd session and throw an appError
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "Booking Failed");
    }

}



// get my bookings service
const getMyBookingsFromDB = async (userId: string) => {
    console.log(userId)
    // get my bookings by user id
    const bookings = await Booking.find({ user: userId }).populate("user").populate("car");
    return bookings;
}



export const bookingService = {
    createBookingIntoDb,
    getBookingsFromDb,
    getMyBookingsFromDB
}