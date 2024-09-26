import { Router } from "express";
import { userController } from "./user.controller";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

// route for get all users
router.get('/', verifyToken("admin"), userController.getAllUser);

// route for update user's status
router.patch('/change-status/:id', verifyToken("admin"), userController.updateUserStatus);

// route for update user's role
router.patch('/change-role/:id', verifyToken("admin"), userController.updateUserRole);

// route for update user information
router.put('/:id', verifyToken("admin", "user"), userController.updateUserInformation);

export const userRoutes = router;