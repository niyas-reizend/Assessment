import Joi from "joi";

export const userRegisterSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.base": "name should be a string",
        "string.empty": "name must contain a value",
        "string.min": "name must be atleast 3 characters",
        "any.required": "name is a required field"
    }),
    phone_number: Joi.string().length(10).required().messages({
        "string.base": "phone number should be a string",
        "string.empty": "phone number must contain a value",
        "string.length": "phone number must be 10 digit",
        "any.required": "phone number is a required field"
    }),
    email:Joi.string().min(3).required().email().messages({
        "string.min":"email must be valid",
        "string.email":"email must be valid",
        "any.required":"email is required"
    }),
    password: Joi.string().min(3).required().messages({
        "string.base": "password should be a text",
        "string.min": "name must be atleast 3 characters",
        "any.required": "name is a required field"
    }),
    role: Joi.string().optional().messages({
        "string.base": "password should be a string",
    })
})