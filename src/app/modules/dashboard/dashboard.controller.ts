import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { dashboardService } from "./dashboard.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

// controller for get dashboard stats
const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const data = await dashboardService.getDashboardStatsFromDB();

    sendResponse(res, { success: true, status: httpStatus.OK, message: "Dashboard stats retrieved successfully", data })
})


// controller for get user dashboard stats
const getUserDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const data = await dashboardService.getUserDashboardStatsFromDB(req.user._id);
    sendResponse(res, { success: true, status: httpStatus.OK, message: "User dashboard stats retrieved successfully", data })
})

export const dashboardController = {
    getDashboardStats,
    getUserDashboardStats
}