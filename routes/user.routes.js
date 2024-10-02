const router = require('express').Router();
const userController = require('../controllers/user.controller');
const isAuth = require('../middlewares/auth');

const {
    GET_USERS,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
} = require('../endpoints/user.endpoints');

const validation = require('../validation/user.validation');

// user routes
router.get('/', isAuth(GET_USERS), validation.getUsersValid, userController.getAllUsers);
router.post('/login', validation.loginValid, userController.login);
router.post('/add', isAuth(ADD_USER), validation.addUserValid, userController.addUser);
router.patch('/update', isAuth(UPDATE_USER), validation.updateUserValid, userController.updateUser);
router.delete('/delete', isAuth(DELETE_USER), validation.deleteUserValid, userController.deleteUser);

module.exports = router;