import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
// import { paymentService } from "./payment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import configs from "../../configs";

const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = configs.sslcommerz_store_id
const store_passwd = configs.sslcommerz_store_passwd
const is_live = false
const redirect_url = configs.node_env === "production" ? configs.live_client_url : configs.local_client_url;


const createPayment = catchAsync(async (req: Request, res: Response) => {

    const reqData = req.body;
    // create payment
    // const result = await paymentService.createPaymentIntoDB(req.body);

    const transactionId = Math.floor(Math.random() * 10000000000);

    const data = {
        total_amount: reqData.amount,
        currency: reqData.currency,
        tran_id: transactionId,
        success_url: `${redirect_url}/payment-success`,
        fail_url: `${redirect_url}/payment-fail`,
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
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then((apiResponse: any) => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
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
    });
});



export const paymentController = {
    createPayment
}