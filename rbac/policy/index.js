const roles = require("../../enums/roles");

// roles policies
const adminPolicy = require("./adminPolicy");
const userPolicy = require("./userPolicy");

const opts = {

    [roles.ADMIN]: {
        can: adminPolicy
    },
    [roles.USER]: {
        can: userPolicy
    }
};

module.exports = opts;