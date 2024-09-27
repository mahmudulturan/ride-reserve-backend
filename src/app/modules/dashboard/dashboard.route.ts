import { Router } from "express";
import { dashboardController } from "./dashboard.controller";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();


router.get('/admin-stats', verifyToken("admin"), dashboardController.getDashboardStats);

export const dashboardRoutes = router;