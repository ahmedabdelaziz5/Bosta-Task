const joi = require('joi');
const { validator } = require('../middlewares/validation');
const userNameRegex = new RegExp("^[a-zA-Z0-9_\\-]+$");
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

module.exports = {

    loginValid: validator({
        body: joi.object().required().keys({
            userName: joi.string().min(3).max(30).pattern(userNameRegex).required().messages({
                'any.required': 'userName is a required field',
                'string.base': 'userName should be a string',
                'string.empty': 'userName cannot be empty',
                'string.min': 'userName should be at least 3 characters long',
                'string.max': 'userName should be less than or equal to 30 characters',
                'string.pattern.base': 'userName can only contain letters, numbers, underscores, and hyphens',
            }),
            password: joi.string().min(8).max(32).pattern(passwordRegex).required().messages({
                'string.empty': 'password cannot be an empty field',
                'any.required': 'password is a required field',
                'string.base': 'password should be a type of text',
                'string.min': 'Password should be at least 8 characters long',
                'string.max': 'Password should be less than or equal to 32 characters',
                'string.pattern.base': 'password should have at least one uppercase letter, one lowercase letter, one digit, and one special character',
            }),
        })
    }),

    forgetPasswordValid: validator({
        body: joi.object().required().keys({
            email: joi.string().email().required().messages({
                "any.required": "email is a required field",
                'string.empty': 'email cannot be an empty field',
                'string.base': 'email should be a type of text',
                'string.email': 'email should be a valid email'
            }),
        })
    }),

    updateProfileValid: validator({
        body: joi.object().required().keys({
            userName: joi.string().min(3).max(30).pattern(userNameRegex).messages({
                'string.base': 'userName should be a string',
                'string.empty': 'userName cannot be empty',
                'string.min': 'userName should be at least 3 characters long',
                'string.max': 'userName should be less than or equal to 30 characters',
                'string.pattern.base': 'userName can only contain letters, numbers, underscores, and hyphens',
            }),
            email: joi.string().email().messages({
                'string.empty': 'email cannot be an empty field',
                'string.base': 'email should be a type of text',
                'string.email': 'email should be a valid email'
            }),
        })
    }),

    changePasswordValid: validator({
        body: joi.object().required().keys({
            oldPassword: joi.string().required().messages({
                'string.empty': 'password cannot be an empty field',
                'any.required': 'password is a required field',
                'string.base': 'password should be a type of text',
            }),
            newPassword: joi.string().min(8).max(32).pattern(passwordRegex).required().invalid(joi.ref('oldPassword')).messages({
                'string.empty': 'password cannot be an empty field',
                'any.invalid': 'new password should not be the same as the old password',
                'any.required': 'password is a required field',
                'string.base': 'password should be a type of text',
                'string.min': 'Password should be at least 8 characters long',
                'string.max': 'Password should be less than or equal to 32 characters',
                'string.pattern.base': 'password should have at least one uppercase letter, one lowercase letter, one digit, and one special character',
            }),
            confirmPassword: joi.string().min(8).max(32).pattern(passwordRegex).required().valid(joi.ref('newPassword')).messages({
                'string.empty': 'confirm password cannot be an empty field',
                'any.invalid': 'new password should not be the same as the old password',
                'any.required': 'confirm password is a required field',
                'string.base': 'confirm password should be a type of text',
                'any.only': 'confirm password should match the new password',
                'string.base': 'confirm password should be a type of text',
                'string.min': 'confirm password should be at least 8 characters long',
                'string.max': 'confirm password should be less than or equal to 32 characters',
                'string.pattern.base': 'confirm password should have at least one uppercase letter, one lowercase letter, one digit, and one special character',
            }),
        })
    }),

};