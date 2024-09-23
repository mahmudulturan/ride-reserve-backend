import z from 'zod';

const createBookingValidationSchema = z.object({
    body: z.object({
        user: z.string({ required_error: "User id is required", invalid_type_error: "User id must be a string" }),
        car: z.string({ required_error: "Car id is required", invalid_type_error: "Car id must be a string" }),
        startTime: z.string({ required_error: "Start time is required", invalid_type_error: "Start time must be a string" }),
        date: z.string({ required_error: "Date is required", invalid_type_error: "Date must be a string" }),
        nidOrPassport: z.string({ required_error: "Nid or passport is required", invalid_type_error: "Nid or passport must be a string" }),
        drivingLicense: z.string({ required_error: "Driving license is required", invalid_type_error: "Driving license must be a string" }),
        paymentMethod: z.string({ required_error: "Payment method is required", invalid_type_error: "Payment method must be a string" }),
        accountNo: z.string({ required_error: "Account no is required", invalid_type_error: "Account no must be a string" }),
    })
})


export const bookingValidation = {
    createBookingValidationSchema
}