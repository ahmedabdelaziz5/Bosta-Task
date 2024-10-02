'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

module.exports = sequelize.define('Admin', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 30],
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'admin',
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
  }
}, {
  freezeTableName: true,
  tableName: 'admins',
});
