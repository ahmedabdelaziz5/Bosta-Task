'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Index 1: Index on the 'title' column
    await queryInterface.addIndex('books', ['title'], {
      name: 'title_index',
      unique: false,
    });

    // Index 2: Index on the 'ISBN' column
    await queryInterface.addIndex('books', ['ISBN'], {
      name: 'ISBN_unique_index',
      unique: true,
    });

    // Index 3: Index on the 'author' column
    await queryInterface.addIndex('books', ['author'], {
      name: 'author_index',
      unique: false,
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('books', 'author_index');
    await queryInterface.removeIndex('books', 'title_index');
    await queryInterface.removeIndex('books', 'ISBN_unique_index');
  }
};
