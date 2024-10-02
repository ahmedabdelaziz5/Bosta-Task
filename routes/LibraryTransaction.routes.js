const router = require('express').Router();
const libraryController = require('../controllers/LibraryTransaction.controller');
const isAuth = require('../middlewares/auth');

const {
    BORROW_BOOK,
    RETURN_BOOK,
    GET_MY_BORROWED_BOOKS,
    GET_TRANSACTIONS,
    BORROW_TRANSACTIONS_REPORT,
    OVERDUE_TRANSACTIONS_REPORT,
} = require('../endpoints/LibraryTransaction.endpoints');

const validation = require('../validation/LibraryTransaction.validation');

// library management endpoints
router.get('/currentBooks', isAuth(GET_MY_BORROWED_BOOKS), validation.getMyCurrentBooks, libraryController.getMyCurrentBooks);
router.get('/transactions', isAuth(GET_TRANSACTIONS), validation.getTransactionsValid, libraryController.getTransactions);
router.get('/borrowTransactionsReport', isAuth(BORROW_TRANSACTIONS_REPORT), validation.borrowTransactionsReportValid, libraryController.borrowTransactionsReport);
router.get('/overdueTransactionsReport', isAuth(OVERDUE_TRANSACTIONS_REPORT), libraryController.overdueTransactionsReport);
router.post('/borrow', isAuth(BORROW_BOOK), validation.borrowBookValid, libraryController.borrowBook);
router.post('/return', isAuth(RETURN_BOOK), validation.returnBookValid, libraryController.returnBook);

module.exports = router;