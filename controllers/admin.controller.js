const adminRepo = require('../models/admin/admin.repo');
const { generateToken } = require('../helpers/tokenManager');
const { comparePassword, hashPassword } = require('../helpers/passwordManager');
const { asyncHandler } = require('../utils/asyncHandler');
const { createResponse } = require('../utils/createResponse');
const { generatePassword } = require('../helpers/generatePasswords');
const { setUpMails } = require('../utils/emailService');

exports.login = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const admin = await adminRepo.isExist(
        { where: { userName } }
    );
    if (!admin.success) return res.status(admin.statusCode).json(admin);
    const passwordMatch = await comparePassword(password, admin.data.password);
    if (!passwordMatch) return res.status(409).json(createResponse(false, "Invalid password !", 401));
    const token = generateToken({
        id: admin.data.id,
        email: admin.data.email,
        userName: admin.data.userName,
        role: "admin"
    });
    delete admin.data.password;
    return res.status(200).json(createResponse(true, "success", 200, null, { token, ...admin.data }));
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const updatedAdmin = await adminRepo.updateAdmin(
        { where: { id: req.user.id } },
        req.body
    );
    delete updatedAdmin.data;
    return res.status(updatedAdmin.statusCode).json(updatedAdmin);
});

exports.changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const admin = await adminRepo.isExist({
        where: { id: req.user.id }
    });
    if (!admin.success) {
        return res.status(admin.statusCode).json(admin);
    }
    let passwordMatch = await comparePassword(oldPassword, admin.data.password);
    if (!passwordMatch) {
        return res.status(400).json(createResponse(false, "Invalid password !", 400));
    }
    let newHashedPassword = await hashPassword(newPassword);
    let updatedAdmin = await adminRepo.updateAdmin(
        { where: { id: req.user.id } },
        { password: newHashedPassword }
    );
    delete updatedAdmin.data;
    return res.status(updatedAdmin.statusCode).json(updatedAdmin);
});

exports.forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const admin = await adminRepo.isExist(
        { where: { email } }
    );
    if (!admin.success) return res.status(admin.statusCode).json(admin);
    let newPassword = generatePassword();
    let emailTransport = await setUpMails(
        "forgetPassword",
        { email: admin.data.email, newPassword }
    );
    if (!emailTransport.success) return res.status(emailTransport.statusCode).json(emailTransport);
    await adminRepo.updateAdmin(
        { where: { id: admin.data.id } },
        { password: await hashPassword(newPassword) }
    );
    return res.status(emailTransport.statusCode).json(emailTransport);
});