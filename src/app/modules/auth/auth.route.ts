import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/sign-up', authController.createUser);

router.post('/sign-in', authController.loginUser);

export const authRoutes = router;