import z from 'zod'

const createCarValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }),
        description: z.string({ required_error: "Description is required", invalid_type_error: "Description must be a string" }),
        color: z.string({ required_error: "Color is required", invalid_type_error: "Color must be a string" }),
        isElectric: z.boolean({ required_error: "Is electric is required", invalid_type_error: "Is electric must be a boolean" }),
        features: z.array(z.string({ required_error: "Features is required", invalid_type_error: "Features must be an array of strings" })),
        pricePerHour: z.number({ required_error: "Price per hour is required", invalid_type_error: "Price per hour must be a number" }),
    })
})

export const carValidation = {
    createCarValidationSchema
}