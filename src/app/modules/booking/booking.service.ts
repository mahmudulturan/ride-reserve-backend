import { IBooking } from "./booking.interface";
import Booking from "./booking.model";


const createBooking = (payload: IBooking) => {
    const newBooking = Booking.create(payload);
    return newBooking;
}


export const bookingService = {
    createBooking
}