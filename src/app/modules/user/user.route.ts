import { Router } from "express";
import { userController } from "./user.controller";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

router.get('/', verifyToken("admin"), userController.getAllUser);


export const userRoutes = router;