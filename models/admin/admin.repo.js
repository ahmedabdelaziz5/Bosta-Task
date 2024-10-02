const { Admin } = require('../index');
const { createResponse } = require('../../utils/createResponse');

exports.isExist = async (filter) => {
    try {
        const admin = await Admin.findOne(filter);
        if (!admin) {
            return createResponse(false, "Admin not found !", 404);
        }
        return createResponse(true, "success", 200, null, admin.dataValues);
    }
    catch (err) {
        return createResponse(false, err.message, 500);
    }
};

exports.updateAdmin = async (filter, data) => {
    try {
        const admin = await Admin.update(data, filter);
        if (!admin[0]) {
            return createResponse(false, "Admin not found !", 404);
        }
        return createResponse(true, "success", 200, null);
    }
    catch (err) {
        return createResponse(false, err.message, 500);
    }
};