import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/sign-up', authController.createUser);

export const authRoutes = router;