import { Router } from "express";
import { dashboardController } from "./dashboard.controller";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();


router.get('/admin-stats', verifyToken("admin"), dashboardController.getDashboardStats);


router.get('/user-stats', verifyToken("user"), dashboardController.getUserDashboardStats);


export const dashboardRoutes = router;