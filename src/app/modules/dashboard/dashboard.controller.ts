import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { dashboardService } from "./dashboard.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const data = dashboardService.getDashboardStatsFromDB();

    sendResponse(res, { success: true, status: httpStatus.OK, message: "Dashboard stats retrieved successfully", data })
})


export const dashboardController = {
    getDashboardStats
}