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



export const carService = {
    createCarIntoDb,
    getAllCarsFromDb
}