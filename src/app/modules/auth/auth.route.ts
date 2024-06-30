import { Router } from "express";
import { authController } from "./auth.controller";
import requestValidation from "../../middlewares/requestValidation";
import { authValidation } from "./auth.validation";

const router = Router();

// route for register
router.post('/signup', requestValidation(authValidation.signUpValidationSchema), authController.createUser);


// route for login
router.post('/signin', authController.loginUser);

export const authRoutes = router;