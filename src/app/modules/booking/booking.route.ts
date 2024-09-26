import { Router } from "express";
import { bookingController } from "./booking.controller";
import verifyToken from "../../middlewares/verifyToken";
import requestValidation from "../../middlewares/requestValidation";
import { bookingValidation } from "./booking.validation";

const router = Router();

// routes for get all bookings
router.get('/', verifyToken("admin"), bookingController.getAllBookings);

// routes for get my bookings
router.get('/my-bookings', verifyToken("user"), bookingController.getMyBookings);

// routes for get my bookings stats
router.get('/my-bookings-stats', verifyToken("user"), bookingController.getMyBookingsStats);

// routes for create a booking
router.post('/', verifyToken("user"), requestValidation(bookingValidation.createBookingValidationSchema), bookingController.createBooking);



export const bookingRoutes = router;