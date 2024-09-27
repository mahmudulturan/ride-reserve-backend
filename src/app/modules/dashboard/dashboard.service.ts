import Booking from "../booking/booking.model";
import Car from "../car/car.model";
import Payment from "../payment/payment.model";

const getDashboardStatsFromDB = async () => {
    const totalBookings = await Booking.find({});
    const totalCars = await Car.find({ isDeleted: false });
    const availableCars = await Car.find({ status: "available", isDeleted: false });
    const allPayments = await Payment.find({ status: "paid" });
    const totalPayments = allPayments.reduce((total, payment) => total + payment.amount, 0);

    return { totalBookings, totalCars, availableCars, totalPayments };
}


export const dashboardService = {
    getDashboardStatsFromDB
}