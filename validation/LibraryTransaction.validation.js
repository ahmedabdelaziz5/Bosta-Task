const joi = require('joi');
const { validator } = require('../middlewares/validation');
const moment = require('moment');

module.exports = {
    borrowBookValid: validator({
        query: joi.object().keys({
            bookId: joi.number().integer().min(1).required().messages({
                'any.required': 'bookId is a required field',
                'number.base': 'bookId should be a type of number',
                'number.integer': 'bookId should be an integer',
                'number.min': 'bookId should be greater than or equal to 1',
            }),
        })
    }),
    returnBookValid: validator({
        query: joi.object().required().keys({
            bookId: joi.number().integer().min(1).required().messages({
                'any.required': 'bookId is a required field',
                'number.base': 'bookId should be a type of number',
                'number.integer': 'bookId should be an integer',
                'number.min': 'bookId should be greater than or equal to 1',
            }),
        })
    }),
    getTransactionsValid: validator({
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
            overdue: joi.boolean().valid(true).messages({
                'boolean.base': 'overdue should be a type of boolean',
                'boolean.empty': 'overdue cannot be an empty field',
            }),
        })
    }),
    getMyCurrentBooks: validator({
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
    borrowTransactionsReportValid: validator({
        /*
        * startDate: required, string, date format (DD/MM/YYYY), less than or equal to the current date
        * endDate: optional, string, date format (DD/MM/YYYY), less than or equal to the current date, greater than or equal to startDate
        * max date difference between startDate and endDate is 1 month
        */
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
        }),
        body: joi.object().required().keys({
            startDate: joi.string().required().custom((value, helpers) => {
                const date = moment(value, 'MM/DD/YYYY', true);
                if (!date.isValid()) return helpers.message('Invalid startDate format, must be MM/DD/YYYY');
                if (date.isAfter(moment())) return helpers.message('startDate must be less than or equal to the current date');
                return value;
            }),
            endDate: joi.string().custom((value, helpers) => {
                if (!value) return value;
                const date = moment(value, 'MM/DD/YYYY', true);
                if (!date.isValid()) return helpers.message('Invalid endDate format, must be MM/DD/YYYY');
                if (date.isAfter(moment())) return helpers.message('endDate must be less than or equal to the current date');
                return value;
            })
        }).custom((obj, helpers) => {
            obj.startDate = moment(obj.startDate, 'MM/DD/YYYY', true);
            if (obj.endDate) {
                obj.endDate = moment(obj.endDate, 'MM/DD/YYYY', true);
                if (obj.startDate.isAfter(obj.endDate)) return helpers.message('startDate must be less than or equal to endDate');
                if (obj.endDate.diff(obj.startDate, 'months', true) > 1) return helpers.message('The date difference must be less than or equal to 1 month');
            }
            return obj;
        })
    })
};