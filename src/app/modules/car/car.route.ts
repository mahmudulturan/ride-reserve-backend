import { Router } from "express";
import { carController } from "./car.controller";

const router = Router();

router.post('/', carController.createCar);

export const carRoutes = router;