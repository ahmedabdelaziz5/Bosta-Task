const { LibraryTransaction } = require('../index');
const { createResponse } = require('../../utils/createResponse');

exports.listTransactions = async (filter, options) => {
    try {
        const { page, limit } = options;
        const offset = (page - 1) * limit;
        const transactions = await LibraryTransaction.findAndCountAll({
            where: filter,
            limit,
            offset,
            include: options.include,
            raw: true,
            nest: true,
        });
        if (!transactions.count) {
            return createResponse(false, "No transactions yet!", 404);
        }
        const totalPages = Math.ceil(transactions.count / limit);
        return createResponse(true, "success", 200, null,
            {
                transactions: transactions.rows,
                pagination: {
                    totalTransactions: transactions.count,
                    totalPages,
                    currentPage: page,
                    pageSize: limit
                }
            }
        );
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.isExist = async (filter) => {
    try {
        const transaction = await LibraryTransaction.findOne(filter);
        if (!transaction) {
            return createResponse(false, "transaction not found", 404);
        }
        return createResponse(true, "success", 200, null, transaction.dataValues);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.createTransaction = async (data) => {
    try {
        const transaction = await LibraryTransaction.create(data);
        if (!transaction) {
            return createResponse(false, "transaction has not been created", 400);
        };
        return createResponse(true, "success", 201);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.updateTransaction = async (filter, data) => {
    try {
        const result = await LibraryTransaction.update(data, filter);
        if (!result[0]) {
            return createResponse(false, "transaction not found !", 404);
        }
        return createResponse(true, "success", 200, null);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};