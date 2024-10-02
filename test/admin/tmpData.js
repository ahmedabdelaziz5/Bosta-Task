const e = require("express");

// Route
exports.adminRoute = '/api/admin';


// ------------------------------ login ------------------------------ //
exports.SuccessAdminLogin = {
    userName: "admin",
    password: "Admin@123"
};
exports.NotFoundAdmin = {
    userName: "admin121",
    password: "Admin@123324"
};
exports.InvalidAdminPassword = {
    userName: "admin",
    password: "Admin@123324"
};