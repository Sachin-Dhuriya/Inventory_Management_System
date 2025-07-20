import joi from 'joi';

export const signupSchema = joi.object({
    username: joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Username is Required",
            "string.min": "Username should have atleast 3 characters",
            "any.required": "Username is Required"
        }),
    email: joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email",
            "any.required": "Email is required"
        }),
    password: joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters long",
            "string.empty": "Password is required",
            "any.required": "Password is required"
        })
})

export const loginSchema = joi.object({
    email: joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email",
            "any.required": "Email is required"
        }),
    password: joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters long",
            "string.empty": "Password is required",
            "any.required": "Password is required"
        })
})