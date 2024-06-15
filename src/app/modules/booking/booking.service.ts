import { IBooking } from "./booking.interface";
import Booking from "./booking.model";


const createBookingIntoDb = (payload: IBooking) => {
    const newBooking = Booking.create(payload);
    return newBooking;
}


export const bookingService = {
    createBookingIntoDb
}