import { ICar } from "./car.interface";
import Car from "./car.model";

// create car service
const createCarIntoDb = async (payload: ICar) => {

    // create car
    const car = await Car.create(payload);

    return car;
}



export const carService = {
    createCarIntoDb
}