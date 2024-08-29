import { Router } from "express";
import { authController } from "./auth.controller";
import requestValidation from "../../middlewares/requestValidation";
import { authValidation } from "./auth.validation";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

// route for register
router.post('/signup', requestValidation(authValidation.signUpValidationSchema), authController.createUser);


// route for login
router.post('/signin', authController.loginUser);

// routes for get user
router.get('/get-user', verifyToken("user", "admin"), authController.getUser);

export const authRoutes = router;