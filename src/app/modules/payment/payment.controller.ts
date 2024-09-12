import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import configs from "../../configs";
import { paymentRoutes } from "./payment.route";

const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = configs.sslcommerz_store_id
const store_passwd = configs.sslcommerz_store_passwd
const is_live = false
const redirect_url = configs.node_env === "production" ? configs.live_server_url : configs.local_server_url;


const createPayment = catchAsync(async (req: Request, res: Response) => {

    const reqData = req.body;
    const transactionId = Math.floor(Math.random() * 10000000000);

    // create payment
    await paymentService.createPaymentIntoDB({ ...reqData, transactionId });
    let status = "pending";

    // data for payment
    const data = {
        total_amount: reqData.amount,
        currency: reqData.currency,
        tran_id: transactionId,
        success_url: `${redirect_url}/api/payments/payment-success/${transactionId}`,
        fail_url: `${redirect_url}/api/payments/payment-failed/${transactionId}`,
        cancel_url: `${redirect_url}/payment-cancel`,
        ipn_url: `${redirect_url}/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    // init sslcommerz
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then((apiResponse: any) => {
        let GatewayPageURL = apiResponse.GatewayPageURL;

        status = apiResponse.status == 'SUCCESS' ? 'paid' : 'failed'

        if (GatewayPageURL) {
            sendResponse(res,
                {
                    status: httpStatus.CREATED,
                    success: true,
                    message: "Payment url created successfully",
                    data: {
                        url: GatewayPageURL
                    }
                });
        } else {
            sendResponse(res,
                {
                    status: httpStatus.BAD_REQUEST,
                    success: false,
                    message: "Payment url not created",
                    data: {}
                });
        }
    }).catch((_error: any) => {
        sendResponse(res,
            {
                status: httpStatus.BAD_REQUEST,
                success: false,
                message: "Payment url not created",
                data: {}
            });
    });

    // route for payment success
    paymentRoutes.post('/payment-success/:id', async (req: Request, res: Response) => {
        const updateResult = await paymentService.updatePaymentStatus(status, req.params.id);
        const successRedirect = configs.node_env === "production" ? configs.live_client_url : configs.local_client_url;
        if (updateResult?.status === 'paid') {
            res.redirect(`${successRedirect}/dashboard/user/payment-success/${req.params.id}`);
        } else {
            res.redirect(`${successRedirect}/dashboard/user/payment-failed/${req.params.id}`);
        }
    });

    // route for payment failed
    paymentRoutes.post('/payment-failed/:id', async (req: Request, res: Response) => {
        const updateResult = await paymentService.updatePaymentStatus("failed", req.params.id);
        const successRedirect = configs.node_env === "production" ? configs.live_client_url : configs.local_client_url;
        if (updateResult?.status === 'failed') {
            res.redirect(`${successRedirect}/dashboard/user/payment-failed/${req.params.id}`);
        } else {
            res.redirect(`${successRedirect}/dashboard/user/payment-success/${req.params.id}`);
        }
    });

});



export const paymentController = {
    createPayment
}