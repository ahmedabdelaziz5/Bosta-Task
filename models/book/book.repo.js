const { Book } = require('../index');
const { createResponse } = require('../../utils/createResponse');

exports.listBooks = async (filter, pagination) => {
    try {
        const { page, limit } = pagination;
        const offset = (page - 1) * limit;
        const books = await Book.findAndCountAll({
            where: filter,
            limit,
            offset
        });
        if (!books.count) {
            return createResponse(false, "No books with this filter was found !", 404);
        }
        pagination = {
            totalRecords: books.count,
            totalPages: Math.ceil(books.count / limit),
            currentPage: page,
            pageSize: limit,
        };
        return {
            statusCode: 200,
            success: true,
            message: 'success',
            data: books.rows,
            pagination,
        };
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.isExist = async (filter) => {
    try {
        const book = await Book.findOne(filter);
        if (!book) {
            return createResponse(false, "Book not found", 404);
        }
        return createResponse(true, "success", 200, null, book.dataValues);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.createBook = async (data) => {
    try {
        const book = await Book.create(data);
        if (!book) {
            return createResponse(false, "Book has not been created", 400);
        };
        return createResponse(true, "success", 201);
    }
    catch (error) {
        console.log(error);
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.updateBook = async (filter, data) => {
    try {
        const result = await Book.update(data, filter);
        if (!result[0]) {
            return createResponse(false, "Book not found !", 404);
        }
        return createResponse(true, "success", 200, null);
    }
    catch (error) {
        console.log(error.message);
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.deleteBook = async (filter) => {
    try {
        const result = await Book.destroy(filter);
        if (!result) {
            return createResponse(false, "Book not found !", 404);
        }
        return createResponse(true, "success", 200);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    };
};