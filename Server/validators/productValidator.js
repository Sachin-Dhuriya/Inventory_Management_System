import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.empty": "Product name is required",
            "string.min": "Product name should have at least 3 characters",
            "any.required": "Product name is required"
        }),

    description: Joi.string()
        .min(5)
        .required() 
        .messages({
            "string.empty": "Product description is required",
            "string.min": "Product description should have at least 5 characters",
            "any.required": "Product description is required"
        }),

    price: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Product price must be a number",
            "number.positive": "Product price must be greater than zero",
            "any.required": "Product price is required"
        }),

    quantity: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Product quantity must be a number",
            "number.min": "Product quantity cannot be negative",
            "number.integer": "Product quantity must be an integer",
            "any.required": "Product quantity is required"
        })
});

export default productSchema;