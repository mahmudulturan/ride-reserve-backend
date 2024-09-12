import z from 'zod'


const createPaymentValidationSchema = z.object({
    body: z.object({
        amount: z.number({ required_error: "Amount is required", invalid_type_error: "Amount must be a number" }),
        currency: z.string({ required_error: "Currency is required", invalid_type_error: "Currency must be a string" }),
        booking: z.string({ required_error: "Booking is required", invalid_type_error: "Booking must be a string" }),
        user: z.string({ required_error: "User is required", invalid_type_error: "User must be a string" }),
    })
})


export const paymentValidation = {
    createPaymentValidationSchema
}