import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { carRoutes } from "../modules/car/car.route";
import { bookingRoutes } from "../modules/booking/booking.route";
import { userRoutes } from "../modules/user/user.route";
import { paymentRoutes } from "../modules/payment/payment.route";
import { dashboardRoutes } from "../modules/dashboard/dashboard.route";

const router = Router();

const routes = [
    {
        path: '/auth',
        router: authRoutes
    },
    {
        path: '/cars',
        router: carRoutes
    },
    {
        path: '/bookings',
        router: bookingRoutes
    },
    {
        path: '/users',
        router: userRoutes
    },
    {
        path: '/payments',
        router: paymentRoutes
    },
    {
        path: '/dashboard',
        router: dashboardRoutes
    }
]

routes.forEach((route) => {
    router.use(route.path, route.router)
})

export default router;