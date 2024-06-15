import z from 'zod';

const createBookingValidationSchema = z.object({
    body: z.object({
        carId: z.string({ required_error: "Car id is required", invalid_type_error: "Car id must be a string" }),
        startTime: z.string({ required_error: "Start time is required", invalid_type_error: "Start time must be a string" }),
        date: z.string({ required_error: "Date is required", invalid_type_error: "Date must be a string" }),
    })
})


export const bookingValidation = {
    createBookingValidationSchema
}