import { Router } from "express";
import { carController } from "./car.controller";
import requestValidation from "../../middlewares/requestValidation";
import { carValidation } from "./car.validation";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

// route for create car
router.post('/', verifyToken("admin"), requestValidation(carValidation.createCarValidationSchema), carController.createCar);

// router for get all cars
router.get('/', carController.getAllCars);

// router for get a car
router.get('/:id', carController.getACar);


// router for return a car
router.put('/return', carController.returnCar);

// router for update a car
router.put('/:id', carController.updateACar);

// router for delete a car
router.delete('/:id', carController.deleteACar);


export const carRoutes = router;