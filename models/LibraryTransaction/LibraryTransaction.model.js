'use strict';
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

module.exports = sequelize.define('LibraryTransaction', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    book_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    borrowed_at: {
        allowNull: false,
        type: DataTypes.DATE
    },
    returned_at: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    due_date: {
        allowNull: false,
        type: DataTypes.DATE
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}, {
    paranoid: true,
    freezeTableName: true,
    tableName: 'LibraryTransaction',
});