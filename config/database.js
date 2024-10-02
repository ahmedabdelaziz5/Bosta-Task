require("dotenv").config();
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(config);

const databaseConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log('DB connected successfully !');
    }
    catch (err) {
        console.error({
            status: 500,
            message: 'Error connecting to the database',
            error: err.message
        });
    }
};

module.exports = {
    sequelize,
    databaseConnection
};