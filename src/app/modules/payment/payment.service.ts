import { IPayment } from "./payment.interface";
import Payment from "./payment.model";

const createPaymentIntoDB = async (payload: IPayment) => {
    const payment = await Payment.create(payload);
    return payment;
};

const updatePaymentStatus = async (id: string, { status, transactionId }: { status: string, transactionId: string }) => {
    const payment = await Payment.findByIdAndUpdate(id, { status: status === "true" ? "paid" : "failed", transactionId }, { new: true });
    return payment;
}


export const paymentService = {
    createPaymentIntoDB,
    updatePaymentStatus
}