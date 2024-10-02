const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const isAuth = require('../middlewares/auth');

const {
    CHANGE_PASSWORD,
    UPDATE_PROFILE,
} = require('../endpoints/admin.endpoints');

const validation = require('../validation/admin.validation');

// admin routes
router.post('/login', validation.loginValid, adminController.login);
router.post('/forgetPassword', validation.forgetPasswordValid, adminController.forgetPassword);
router.patch('/updateProfile', isAuth(UPDATE_PROFILE), validation.updateProfileValid, adminController.updateProfile);
router.patch('/changePassword', isAuth(CHANGE_PASSWORD), validation.changePasswordValid, adminController.changePassword);

module.exports = router;