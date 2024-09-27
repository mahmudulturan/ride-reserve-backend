import Booking from "../booking/booking.model";
import Car from "../car/car.model";
import Payment from "../payment/payment.model";

// Get dashboard stats
const getDashboardStatsFromDB = async () => {
    const totalBookings = await Booking.find({});
    const totalCars = await Car.find({ isDeleted: false });
    const availableCars = await Car.find({ status: "available", isDeleted: false });
    const allPayments = await Payment.find({ status: "paid" });
    const totalPayments = allPayments.reduce((total, payment) => total + payment.amount, 0);

    // Get bookings for the last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const last30DaysBookingsArray = await Booking.find({ createdAt: { $gte: thirtyDaysAgo } });

    // Create an object to store bookings count for each date
    const bookingsByDate: { [date: string]: number; } = {};

    // Initialize bookingsByDate with zeros for all dates in the last 30 days
    for (let i = 0; i < 30; i++) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateString = date.toISOString().split('T')[0];
        bookingsByDate[dateString] = 0;
    }

    // Count bookings for each date
    last30DaysBookingsArray.forEach(booking => {
        const dateString = booking.createdAt.toISOString().split('T')[0];
        bookingsByDate[dateString]++;
    });

    // Convert bookingsByDate object to an array of {date, totalBookings}
    const last30DaysBookings = Object.entries(bookingsByDate).map(([date, totalBookings]) => ({
        date,
        totalBookings
    })).sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return (dateA.getTime() || 0) - (dateB.getTime() || 0);
    })

    return {
        totalBookings: totalBookings.length,
        totalCars: totalCars.length,
        availableCars: availableCars.length,
        totalPayments,
        last30DaysBookings
    };
}

// Get user dashboard stats
const getUserDashboardStatsFromDB = async (userId: string) => {
    const totalBookings = await Booking.find({ user: userId });
    const completedBookings = totalBookings.filter((booking) => booking.status === "completed");
    const pendingBookings = totalBookings.filter((booking) => booking.status === "pending");
    const cancelledBookings = totalBookings.filter((booking) => booking.status === "cancelled");
    const approvedBookings = totalBookings.filter((booking) => booking.status === "approved");

    return {
        total: totalBookings.length,
        completed: completedBookings.length,
        pending: pendingBookings.length,
        cancelled: cancelledBookings.length,
        approved: approvedBookings.length
    }
}

export const dashboardService = {
    getDashboardStatsFromDB,
    getUserDashboardStatsFromDB
}