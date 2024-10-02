const joi = require('joi');
const { validator } = require('../middlewares/validation');
const userNameRegex = new RegExp("^[a-zA-Z0-9_\\-]+$");
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

module.exports = {
    getUsersValid: validator({
        query: joi.object().keys({
            page: joi.number().integer().min(1).messages({
                'number.base': 'page should be a type of number',
                'number.integer': 'page should be an integer',
                'number.min': 'page should be greater than or equal to 1',
            }),
            limit: joi.number().integer().min(1).messages({
                'number.base': 'limit should be a type of number',
                'number.integer': 'limit should be an integer',
                'number.min': 'limit should be greater than or equal to 1',
            }),
        })
    }),
    addUserValid: validator({
        body: joi.object().required().keys({
            name: joi.string().min(3).max(30).required().messages({
                'any.required': 'name is a required field',
                'string.empty': 'name cannot be an empty field',
                'string.base': 'name should be a type of text',
                'string.min': 'name should be at least 3 characters long',
                'string.max': 'name should be less than or equal to 30 characters',
            }),
            userName: joi.string().min(3).max(30).pattern(userNameRegex).required().messages({
                'any.required': 'userName is a required field',
                'string.empty': 'userName cannot be an empty field',
                'string.base': 'userName should be a type of text',
                'string.min': 'userName should be at least 3 characters long',
                'string.max': 'userName should be less than or equal to 30 characters',
                'string.pattern.base': 'userName should contain only alphabets, numbers, hyphen, and underscore'
            }),
            email: joi.string().email().required().messages({
                'any.required': 'email is a required field',
                'string.empty': 'email cannot be an empty field',
                'string.base': 'email should be a type of text',
                'string.email': 'email should be a valid email'
            }),
            password: joi.string().min(8).max(32).pattern(passwordRegex).required().messages({
                'any.required': 'password is a required field',
                'string.empty': 'password cannot be an empty field',
                'string.base': 'password should be a type of text',
                'string.min': 'Password should be at least 8 characters long',
                'string.max': 'Password should be less than or equal to 32 characters',
                'string.pattern.base': 'password should have at least one uppercase letter, one lowercase letter, one digit, and one special character',
            }),
        })
    }),
    loginValid: validator({
        body: joi.object().required().keys({
            userId: joi.number().required().messages({
                'any.required': 'userId is a required field',
                'string.empty': 'userId cannot be an empty field',
                'string.base': 'userId should be a type of text',
            }),
            password: joi.string().min(8).max(32).pattern(passwordRegex).required().messages({
                'any.required': 'password is a required field',
                'string.empty': 'password cannot be an empty field',
                'string.base': 'password should be a type of text',
                'string.min': 'Password should be at least 8 characters long',
                'string.max': 'Password should be less than or equal to 32 characters',
                'string.pattern.base': 'password should have at least one uppercase letter, one lowercase letter, one digit, and one special character',
            }),
        })
    }),
    updateUserValid: validator({
        body: joi.object().required().keys({
            userId: joi.number().required().messages({
                'any.required': 'userId is a required field',
                'string.empty': 'userId cannot be an empty field',
                'string.base': 'userId should be a type of text',
            }),
            name: joi.string().min(3).max(30).messages({
                'any.required': 'name is a required field',
                'string.empty': 'name cannot be an empty field',
                'string.base': 'name should be a type of text',
                'string.min': 'name should be at least 3 characters long',
                'string.max': 'name should be less than or equal to 30 characters',
            }),
            userName: joi.string().min(3).max(30).pattern(userNameRegex).messages({
                'any.required': 'userName is a required field',
                'string.empty': 'userName cannot be an empty field',
                'string.base': 'userName should be a type of text',
                'string.min': 'userName should be at least 3 characters long',
                'string.max': 'userName should be less than or equal to 30 characters',
                'string.pattern.base': 'userName should contain only alphabets, numbers, hyphen, and underscore'
            }),
            email: joi.string().email().messages({
                'any.required': 'email is a required field',
                'string.empty': 'email cannot be an empty field',
                'string.base': 'email should be a type of text',
                'string.email': 'email should be a valid email'
            }),
            password: joi.string().min(8).max(32).pattern(passwordRegex).messages({
                'any.required': 'password is a required field',
                'string.empty': 'password cannot be an empty field',
                'string.base': 'password should be a type of text',
                'string.min': 'Password should be at least 8 characters long',
                'string.max': 'Password should be less than or equal to 32 characters',
                'string.pattern.base': 'password should have at least one uppercase letter, one lowercase letter, one digit, and one special character',
            }),
        })
    }),
    deleteUserValid: validator({
        body: joi.object().required().keys({
            userId: joi.number().required().messages({
                'any.required': 'userId is a required field',
                'string.empty': 'userId cannot be an empty field',
                'string.base': 'userId should be a type of text',
            }),
        })
    }),
};