const userRepo = require('../models/user/user.repo');
const { asyncHandler } = require('../utils/asyncHandler');
const { generateToken } = require('../helpers/tokenManager');
const { comparePassword, hashPassword } = require('../helpers/passwordManager');
const { createResponse } = require('../utils/createResponse');

exports.getAllUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const users = await userRepo.listUsers(
        { attributes: { exclude: ['password', 'deletedAt'] } },
        { page, limit }
    );
    return res.status(users.statusCode).json(users);
});

exports.login = asyncHandler(async (req, res) => {
    let { userId, password } = req.body;
    let user = await userRepo.isExist(
        { where: { id: userId } }
    );
    if (!user.success) return res.status(user.statusCode).json(user);
    const passwordMatch = await comparePassword(password, user.data.password);
    if (!passwordMatch) return res.status(409).json(createResponse(false, "Invalid credentials", 409));
    const payload = {
        id: user.data.id,
        email: user.data.email,
        role: "user"
    };
    const token = generateToken(payload);
    delete user.data.password;
    return res.status(200).json(createResponse(true, "success", 200, null, { token, ...user.data }));
});

exports.addUser = asyncHandler(async (req, res) => {
    req.body.password = await hashPassword(req.body.password);
    const user = await userRepo.createUser(req.body);
    return res.status(user.statusCode).json(user);
});

exports.updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    req.body.password ? req.body.password = await hashPassword(req.body.password) : null;
    const user = await userRepo.updateUser(
        { where: { id: userId } },
        req.body
    );
    return res.status(user.statusCode).json(user);
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await userRepo.deleteUser(
        { where: { id: userId } }
    );
    return res.status(user.statusCode).json(user);
});