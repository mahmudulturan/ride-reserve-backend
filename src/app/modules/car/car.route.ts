import { Router } from "express";
import { carController } from "./car.controller";
import requestValidation from "../../middlewares/requestValidation";
import { carValidation } from "./car.validation";

const router = Router();

router.post('/', requestValidation(carValidation.createCarValidationSchema), carController.createCar);

export const carRoutes = router;