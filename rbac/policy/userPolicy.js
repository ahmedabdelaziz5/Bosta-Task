const {
    GET_ALL_BOOKS
} = require('../../endpoints/book.endpoints');

const {
    BORROW_BOOK,
    RETURN_BOOK,
    GET_MY_BORROWED_BOOKS
} = require('../../endpoints/LibraryTransaction.endpoints')


module.exports = [
    // book module
    GET_ALL_BOOKS,

    // library management module
    BORROW_BOOK,
    RETURN_BOOK,
    GET_MY_BORROWED_BOOKS
];