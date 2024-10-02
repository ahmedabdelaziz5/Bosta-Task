const { User } = require('../index');
const { createResponse } = require('../../utils/createResponse');

exports.listUsers = async (filter, pagination) => {
    try {
        const { page, limit } = pagination;
        const offset = (page - 1) * limit;
        const usersPromise = User.findAll({
            filter,
            limit,
            offset
        });
        const usersCountPromise = User.count(filter);
        const [users, totalUsers] = await Promise.all([usersPromise, usersCountPromise]);
        if (!users.length) {
            return createResponse(false, "No users yet!", 404);
        }
        const totalPages = Math.ceil(totalUsers / limit);
        return createResponse(true, "success", 200, null, {
            users,
            pagination: {
                totalUsers,
                totalPages,
                currentPage: page,
                pageSize: limit
            }
        });
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.isExist = async (filter) => {
    try {
        const user = await User.findOne(filter);
        if (!user) {
            return createResponse(false, "User not found", 404);
        }
        return createResponse(true, "success", 200, null, user.dataValues);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.createUser = async (data) => {
    try {
        const user = await User.create(data);
        if (!user) {
            return createResponse(false, "User has not been created", 400);
        };
        return createResponse(true, "success", 201);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.updateUser = async (filter, data) => {
    try {
        const result = await User.update(data, filter);
        if (!result[0]) {
            return createResponse(false, "Admin not found !", 404);
        }
        return createResponse(true, "success", 200, null);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    }
};

exports.deleteUser = async (filter) => {
    try {
        const result = await User.destroy(filter);
        if (!result) {
            return createResponse(false, "User not found !", 404);
        }
        return createResponse(true, "User successfully deleted", 200);
    }
    catch (error) {
        return createResponse(false, "Internal Server Error", 500, error.message);
    };
};