import { IPayment } from "./payment.interface";
import Payment from "./payment.model";

const createPayment = async (payload: IPayment) => {
    const payment = await Payment.create(payload);
    return payment;
}


export const PaymentService = {
    createPayment
}