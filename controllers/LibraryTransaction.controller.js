const libraryTransactionRepo = require('../models/LibraryTransaction/LibraryTransaction.repo');
const bookRepo = require('../models/book/book.repo');
const { asyncHandler } = require('../utils/asyncHandler');
const { createResponse } = require('../utils/createResponse');
const { Op } = require('sequelize');
const { generateCSVReport } = require('../helpers/generateCSVReport');
const { User } = require('../models');
const { Book } = require('../models');
const moment = require('moment');

/*
    Borrow logic 
    1- Get transactions from database to see if the user has already borrowed the book
    2- If the user has already borrowed the book, return an error message
    3- If the user has not borrowed the book, get the book from the database
    4- If the book is not available, return an error message
    5- If the book is available, create a new transaction
    6- Minus 1 from the book's quantity and Add the transaction to the database    
*/
exports.borrowBook = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const bookId = parseInt(req.query.bookId);
    const transaction = await libraryTransactionRepo.isExist({
        where: {
            book_id: bookId,
            user_id: userId,
            returned_at: null
        }
    });
    if (transaction.success) {
        return res.status(400).json(createResponse(false, 'You have already borrowed this book', 400));
    }
    const book = await bookRepo.isExist({ where: { id: bookId } });
    if (!book.success) {
        return res.status(400).json(createResponse(false, 'Book is not available', 400));
    }
    if (!book.data.quantity) {
        return res.status(400).json(createResponse(false, 'Book is not available', 400));
    }
    const newTransaction = {
        user_id: userId,
        book_id: bookId,
        borrowed_at: new Date(),
        due_date: new Date(new Date().setDate(new Date().getDate() + 7))
    }
    const updatedBook = bookRepo.updateBook(
        { where: { id: bookId } },
        { quantity: book.data.quantity - 1 }
    );
    const transactionResult = libraryTransactionRepo.createTransaction(newTransaction);
    await Promise.all([updatedBook, transactionResult]);
    return res.status(200).json(createResponse(true, 200, 'Book borrowed successfully', null, newTransaction));
});

/*
    Return logic 
    1- Get transactions from database to see if the user has borrowed the book
    2- If the user has not borrowed the book, return an error message
    3- If the user has borrowed the book, update the transaction
    4- Update the book's quantity
*/
exports.returnBook = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const bookId = parseInt(req.query.bookId);
    const book = await bookRepo.isExist({ where: { id: bookId } });
    if (!book.success) {
        return res.status(400).json(createResponse(false, 'Book Not found', 404));
    }
    const transaction = await libraryTransactionRepo.isExist({
        where: {
            book_id: bookId,
            user_id: userId,
            returned_at: null
        }
    });
    if (!transaction.success) {
        return res.status(400).json(createResponse(false, 'You have not borrowed this book', 400));
    }
    const updatedTransaction = libraryTransactionRepo.updateTransaction(
        { where: { id: transaction.data.id } },
        { returned_at: new Date() }
    );
    const updatedBook = bookRepo.updateBook(
        { where: { id: bookId } },
        { quantity: book.data.quantity + 1 }
    );
    await Promise.all([updatedTransaction, updatedBook]);
    return res.status(200).json(createResponse(true, 200, 'success'));
});

exports.getMyCurrentBooks = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.user.id;
    const books = await libraryTransactionRepo.listTransactions(
        { user_id: userId },
        { page, limit }
    );
    return res.status(200).json(books);
});

exports.getTransactions = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const overdue = req.query.overdue;
    const today = new Date();
    let queryFilters = [];
    if (overdue) { // if the user wanted to get all the overdue transactions
        queryFilters.push({
            due_date: { [Op.lte]: today },
            returned_at: { [Op.is]: null }
        });
        queryFilters.push({
            due_date: { [Op.lt]: { [Op.col]: 'returned_at' } }
        });
    }
    const filter = overdue ? { [Op.or]: queryFilters } : {};
    const transactions = await libraryTransactionRepo.listTransactions(
        filter,
        { page, limit }
    );
    return res.status(200).json(transactions);
});

exports.borrowTransactionsReport = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const transactions = await libraryTransactionRepo.listTransactions(
        {
            [Op.and]: [
                {
                    borrowed_at: {
                        [Op.between]: [startDate, endDate],
                    },
                }
            ],
        },
        {
            page,
            limit,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'userName', 'email'],
                },
                {
                    model: Book,
                    as: 'book',
                    attributes: ['id', 'title', 'ISBN', 'author', 'shelfLocation',],
                }
            ]
        }
    );
    if (!transactions.success) return res.status(transactions.statusCode).json(transactions);
    const csvContent = generateCSVReport(transactions.data.transactions);
    if (typeof (csvContent) === 'object') return res.status(csvContent.statusCode).json(csvContent);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="borrow-Transactions-Report.csv"');
    return res.status(200).send(csvContent);
});

exports.overdueTransactionsReport = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month').toDate();
    const endOfLastMonth = moment().subtract(1, 'months').endOf('month').toDate();
    const transactions = await libraryTransactionRepo.listTransactions(
        {
            [Op.and]: [
                {
                    due_date: {
                        [Op.between]: [startOfLastMonth, endOfLastMonth],
                    },
                },
                {
                    returned_at: {
                        [Op.gt]: { [Op.col]: 'due_date' },
                    },
                },
            ],
        },
        {
            page,
            limit,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'userName', 'email'],
                },
                {
                    model: Book,
                    as: 'book',
                    attributes: ['id', 'title', 'ISBN', 'author', 'shelfLocation',],
                }
            ]
        }
    );
    if (!transactions.success) return res.status(transactions.statusCode).json(transactions);
    const csvContent = generateCSVReport(transactions.data.transactions);
    if (typeof (csvContent) === 'object') return res.status(csvContent.statusCode).json(csvContent);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="overdue-Transactions-Report.csv"');
    return res.status(200).send(csvContent);
});