import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// route for register
router.post('/sign-up', authController.createUser);


// route for login
router.post('/sign-in', authController.loginUser);

export const authRoutes = router;