const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

module.exports = sequelize.define('Book', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 30]
    }
  },
  ISBN: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [10, 13]
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 30]
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0
    }
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: true,
      min: 0
    }
  },
  shelfLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}, {
  freezeTableName: true,
  tableName: 'books',
  indexes: [
    {
      name: 'idx_books_title',
      fields: ['title']
    },
    {
      name: 'idx_books_ISBN',
      fields: ['ISBN']
    },
    {
      name: 'idx_books_author',
      fields: ['author']
    }
  ]
});