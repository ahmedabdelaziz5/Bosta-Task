const {
    CHANGE_PASSWORD,
    UPDATE_PROFILE,
} = require("../../endpoints/admin.endpoints");

const {
    GET_USERS,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
} = require('../../endpoints/user.endpoints');

const {
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    GET_ALL_BOOKS,
} = require('../../endpoints/book.endpoints');

const {
    GET_TRANSACTIONS,
    BORROW_TRANSACTIONS_REPORT,
    OVERDUE_TRANSACTIONS_REPORT,
} = require('../../endpoints/LibraryTransaction.endpoints');

module.exports = [
    // admin module 
    CHANGE_PASSWORD,
    UPDATE_PROFILE,

    // user module
    GET_USERS,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER, ,

    // book module 
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    GET_ALL_BOOKS,

    // library management module
    GET_TRANSACTIONS,
    BORROW_TRANSACTIONS_REPORT,
    OVERDUE_TRANSACTIONS_REPORT,
];