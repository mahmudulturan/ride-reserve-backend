import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { carRoutes } from "../modules/car/car.route";

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
]

routes.forEach((route) => {
    router.use(route.path, route.router)
})

export default router;