import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ICar } from "./car.interface";
import Car from "./car.model";

// create car service
const createCarIntoDb = async (payload: ICar) => {

    // create car
    const car = await Car.create(payload);

    return car;
}

// get all cars service
const getAllCarsFromDb = async () => {
    // get all cars
    const cars = await Car.find();

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


export const carService = {
    createCarIntoDb,
    getAllCarsFromDb,
    getACarFromDb,
    updateACarFromDb
}