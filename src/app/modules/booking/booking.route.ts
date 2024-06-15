import { Router } from "express";
import { bookingController } from "./booking.controller";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

// routes for create a booking
router.post('/', verifyToken("user"), bookingController.createBooking);

export const bookingRoutes = router;