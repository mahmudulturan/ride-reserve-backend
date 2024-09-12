import { IPayment } from "./payment.interface";
import Payment from "./payment.model";

const createPaymentIntoDB = async (payload: IPayment) => {
    const payment = await Payment.create(payload);
    return payment;
}


export const paymentService = {
    createPaymentIntoDB
}