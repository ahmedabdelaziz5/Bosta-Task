const bookRepo = require('../models/book/book.repo');
const { Op } = require('sequelize');
const { asyncHandler } = require('../utils/asyncHandler');

exports.getBooks = asyncHandler(async (req, res) => {
    const { title, author, ISBN } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let queryFilters = [];
    title ? queryFilters.push({ title: title }) : null;
    author ? queryFilters.push({ author: author }) : null;
    ISBN ? searchQuery.push({ ISBN: ISBN }) : null;
    const books = await bookRepo.listBooks(
        { [Op.or]: queryFilters },
        { page, limit }
    );
    return res.status(books.statusCode).json(books);
});

exports.addBook = asyncHandler(async (req, res) => {
    const book = await bookRepo.createBook(req.body);
    return res.status(book.statusCode).json(book);
});

exports.updateBook = asyncHandler(async (req, res) => {
    const { bookId } = req.body;
    const book = await bookRepo.updateBook(
        { where: { id: bookId } },
        req.body
    );
    return res.status(book.statusCode).json(book);
});

exports.deleteBook = asyncHandler(async (req, res) => {
    const { bookId } = req.body;
    const book = await bookRepo.deleteBook(
        { where: { id: bookId } }
    );
    return res.status(book.statusCode).json(book);
});