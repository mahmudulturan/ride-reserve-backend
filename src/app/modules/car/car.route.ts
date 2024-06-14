import { Router } from "express";
import { carController } from "./car.controller";
import requestValidation from "../../middlewares/requestValidation";
import { carValidation } from "./car.validation";

const router = Router();

// route for create car
router.post('/', requestValidation(carValidation.createCarValidationSchema), carController.createCar);

// router for get all cars
router.get('/', carController.getAllCars);

export const carRoutes = router;