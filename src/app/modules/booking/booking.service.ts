import { IBooking } from "./booking.interface";
import Booking from "./booking.model";


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
    const newBooking = await Booking.create(payload);
    return newBooking;
}


export const bookingService = {
    createBookingIntoDb,
    getBookingsFromDb
}