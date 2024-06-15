import { IBooking } from "./booking.interface";
import Booking from "./booking.model";


const createBookingIntoDb = async (payload: IBooking) => {
    console.log(payload)
    const newBooking = await Booking.create(payload);
    return newBooking;
}


export const bookingService = {
    createBookingIntoDb
}