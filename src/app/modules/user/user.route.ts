import { Router } from "express";
import { userController } from "./user.controller";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

// route for get all users
router.get('/', verifyToken("admin"), userController.getAllUser);

// route for update user's status
router.patch('/change-status/:id', verifyToken("admin"), userController.updateUserStatus);

export const userRoutes = router;