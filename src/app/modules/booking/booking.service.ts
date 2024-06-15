import { IBooking } from "./booking.interface";
import Booking from "./booking.model";


// get all booking service
const getBookingsFromDb = async () => {
    const bookings = await Booking.find();
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