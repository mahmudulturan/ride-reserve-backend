import { IPayment } from "./payment.interface";
import Payment from "./payment.model";

const createPaymentIntoDB = async (payload: IPayment) => {
    const payment = await Payment.create(payload);
    return payment;
};

const updatePaymentStatus = async (status: string, transactionId: string) => {
    const payment = await Payment.findOneAndUpdate({ transactionId }, { status: status === "paid" ? "paid" : "failed" }, { new: true });
    return payment;
}


export const paymentService = {
    createPaymentIntoDB,
    updatePaymentStatus
}