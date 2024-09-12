import { Router } from "express";
import { paymentController } from "./payment.controller";
import requestValidation from "../../middlewares/requestValidation";
import { paymentValidation } from "./payment.validation";

const router = Router();

router.post('/', requestValidation(paymentValidation.createPaymentValidationSchema), paymentController.createPayment);


export const paymentRoutes = router;