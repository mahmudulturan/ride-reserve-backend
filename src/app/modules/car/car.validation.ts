import z from 'zod'

const createCarValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }),
        model: z.string({ required_error: "Model is required", invalid_type_error: "Model must be a string" }),
        year: z.number({ required_error: "Year is required", invalid_type_error: "Year must be a number" }),
        totalPassengers: z.number({ required_error: "Total passengers is required", invalid_type_error: "Total passengers must be a number" }),
        images: z.array(z.string({ required_error: "Images is required", invalid_type_error: "Images must be an array of strings" })),
        totalDoors: z.number({ required_error: "Total doors is required", invalid_type_error: "Total doors must be a number" }),
        description: z.string({ required_error: "Description is required", invalid_type_error: "Description must be a string" }),
        color: z.string({ required_error: "Color is required", invalid_type_error: "Color must be a string" }),
        isElectric: z.boolean({ required_error: "Is electric is required", invalid_type_error: "Is electric must be a boolean" }),
        carType: z.string({ required_error: "Car type is required", invalid_type_error: "Car type must be a string" }),
        features: z.array(z.string({ required_error: "Features is required", invalid_type_error: "Features must be an array of strings" })),
        additionalFeatures: z.array(z.string({ required_error: "Additional features is required", invalid_type_error: "Additional features must be an array of strings" })),
        pricePerHour: z.number({ required_error: "Price per hour is required", invalid_type_error: "Price per hour must be a number" }),
    })
})

export const carValidation = {
    createCarValidationSchema
}