'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const password = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert('User', [
      {
        name: 'User',
        email: 'user@gmail.com',
        Password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User1',
        email: 'user1@gmail.com',
        Password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User2',
        email: 'user2@gmail.com',
        Password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
