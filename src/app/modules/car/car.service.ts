import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ICar } from "./car.interface";
import Car from "./car.model";
import Booking from "../booking/booking.model";
import mongoose from "mongoose";

// create car service
const createCarIntoDb = async (payload: ICar) => {

    // create car
    const car = await Car.create(payload);

    return car;
}

// get all cars service
const getAllCarsFromDb = async () => {
    // get all cars
    const cars = await Car.find({ isDeleted: false });

    return cars;
}


// get a car by _id service
const getACarFromDb = async (id: string) => {
    // get a car
    const car = await Car.findById(id);

    return car;
}


// update a car by _id service
const updateACarFromDb = async (id: string, payload: ICar) => {

    // check if car exist
    const isExist = await Car.findById(id);

    // if not exist throw error
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Car not found");
    }

    // update a car
    const car = await Car.findByIdAndUpdate(id, payload, { new: true });

    return car;
}


// delete a car by _id service
const deleteACarFromDb = async (id: string) => {

    // check if car exist
    const isExist = await Car.findById(id);

    // if not exist throw error
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Car not found");
    }

    // soft delete a car by _id
    const car = await Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    return car;
}


const returnCarWithDb = async (payload: { bookingId: string, endTime: string }) => {

    // find booking by booking id
    const booking = await Booking.findById(payload.bookingId);

    // check if booking exist
    if (!booking) {
        throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }

    // find car by car id
    const car = await Car.findById(booking.car);

    // check if car exist
    if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, "Car not found");
    }

    // calculate total hours
    const totalHours = Number(payload.endTime.split(":")[0]) - Number(booking.startTime.split(":")[0]);

    // calculate total cost
    const totalCost = totalHours * car.pricePerHour;

    // create a session
    const session = await mongoose.startSession();
    try {
        // start transaction
        session.startTransaction();

        // change car status
        car.status = 'available';
        await car.save({ session });

        // update booking endTime and totalCost
        const result = await Booking.findByIdAndUpdate(payload.bookingId, { endTime: payload.endTime, totalCost }, { new: true, session }).populate("car").populate('user');

        // commit and end the session
        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (error) {
        // if error caught then abroat the transaction and endd session and throw an appError
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "Return Car Failed")
    }



}



export const carService = {
    createCarIntoDb,
    getAllCarsFromDb,
    getACarFromDb,
    updateACarFromDb,
    deleteACarFromDb,
    returnCarWithDb
}