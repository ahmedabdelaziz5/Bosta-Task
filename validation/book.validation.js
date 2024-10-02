const joi = require('joi');
const { validator } = require('../middlewares/validation');

module.exports = {
    getBooksValid: validator({
        query: joi.object().keys({
            page: joi.number().min(1).messages({
                'number.base': 'page should be a number',
                'number.empty': 'page cannot be empty',
                'number.min': 'page should be at least 1',
            }),
            limit: joi.number().min(1).messages({
                'number.base': 'limit should be a number',
                'number.empty': 'limit cannot be empty',
                'number.min': 'limit should be at least 1',
            }),
            title: joi.string().min(1).max(30).messages({
                'string.base': 'title should be a string',
                'string.empty': 'title cannot be empty',
                'string.min': 'title should be at least 3 characters long',
                'string.max': 'title should be less than or equal to 30 characters',
            }),
            author: joi.string().min(1).max(30).messages({
                'string.base': 'author should be a string',
                'string.empty': 'author cannot be empty',
                'string.min': 'author should be at least 3 characters long',
                'string.max': 'author should be less than or equal to 30 characters',
            }),
            ISBN: joi.string().min(10).max(13).messages({
                'string.base': 'ISBN should be a string',
                'string.empty': 'ISBN cannot be empty',
                'string.min': 'ISBN should be at least 13 characters long',
                'string.max': 'ISBN should be less than or equal to 13 characters',
            }),
        }).or('title', 'author', 'ISBN').required().messages({
            'object.missing': 'At least one of title, author, or ISBN is required',
        }),
    }),

    addBookValid: validator({
        body: joi.object().required().keys({
            title: joi.string().min(1).max(30).required().messages({
                "any.required": "title is a required field",
                'string.base': 'title should be a string',
                'string.empty': 'title cannot be empty',
                'string.min': 'title should be at least 3 characters long',
                'string.max': 'title should be less than or equal to 30 characters',
            }),
            author: joi.string().min(1).max(30).required().messages({
                "any.required": "author is a required field",
                'string.base': 'author should be a string',
                'string.empty': 'author cannot be empty',
                'string.min': 'author should be at least 3 characters long',
                'string.max': 'author should be less than or equal to 30 characters',
            }),
            ISBN: joi.string().min(10).max(13).required().messages({
                "any.required": "ISBN is a required field",
                'string.base': 'ISBN should be a string',
                'string.empty': 'ISBN cannot be empty',
                'string.min': 'ISBN should be at least 13 characters long',
                'string.max': 'ISBN should be less than or equal to 13 characters',
            }),
            quantity: joi.number().min(1).required().messages({
                "any.required": "quantity is a required field",
                'number.base': 'quantity should be a number',
                'number.empty': 'quantity cannot be empty',
                'number.min': 'quantity should be at least 1',
            }),
            shelfLocation: joi.string().required().messages({
                "any.required": "shelfLocation is a required field",
                'string.base': 'shelfLocation should be a string',
                'string.empty': 'shelfLocation cannot be empty',
                'string.min': 'shelfLocation should be at least 3 characters long',
                'string.max': 'shelfLocation should be less than or equal to 30 characters',
            }),
        })
    }),
    updateBookValid: validator({
        body: joi.object().required().keys({
            bookId: joi.number().min(1).required().messages({
                "any.required": "bookId is a required field",
                'number.base': 'page should be a number',
                'number.empty': 'page cannot be empty',
            }),
            title: joi.string().min(3).max(30).messages({
                'string.base': 'title should be a string',
                'string.empty': 'title cannot be empty',
                'string.min': 'title should be at least 3 characters long',
                'string.max': 'title should be less than or equal to 30 characters',
            }),
            author: joi.string().min(3).max(30).messages({
                'string.base': 'author should be a string',
                'string.empty': 'author cannot be empty',
                'string.min': 'author should be at least 3 characters long',
                'string.max': 'author should be less than or equal to 30 characters',
            }),
            ISBN: joi.string().min(13).max(13).messages({
                'string.base': 'ISBN should be a string',
                'string.empty': 'ISBN cannot be empty',
                'string.min': 'ISBN should be at least 13 characters long',
                'string.max': 'ISBN should be less than or equal to 13 characters',
            }),
            quantity: joi.number().min(1).messages({
                'number.base': 'quantity should be a number',
                'number.empty': 'quantity cannot be empty',
                'number.min': 'quantity should be at least 1',
            }),
            shelfLocation: joi.string().min(1).messages({
                'string.base': 'shelfLocation should be a string',
                'string.empty': 'shelfLocation cannot be empty',
                'string.min': 'shelfLocation should be at least 1 character long',
            }),
        })
    }),
    deleteBookValid: validator({
        body: joi.object().required().keys({
            bookId: joi.number().min(1).required().messages({
                "any.required": "bookId is a required field",
                'number.base': 'bookId should be a number',
                'number.empty': 'bookId cannot be empty',
            }),
        }),
    }),
};