const router = require('express').Router();
const bookController = require('../controllers/book.controller');
const isAuth = require('../middlewares/auth');
const {
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    GET_ALL_BOOKS,
} = require('../endpoints/book.endpoints');

const validation = require('../validation/book.validation');

router.get('/', isAuth(GET_ALL_BOOKS), validation.getBooksValid, bookController.getBooks);
router.post('/add', isAuth(ADD_BOOK), validation.addBookValid, bookController.addBook);
router.patch('/update', isAuth(UPDATE_BOOK), validation.updateBookValid, bookController.updateBook);
router.delete('/delete', isAuth(DELETE_BOOK), validation.deleteBookValid, bookController.deleteBook);

module.exports = router;