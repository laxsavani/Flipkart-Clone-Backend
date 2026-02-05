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
   await queryInterface.bulkInsert('Seller', [
        {
          name: 'Seller',
          email: 'seller@gmail.com',
          Password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Seller1',
          email: 'seller1@gmail.com',
          Password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Seller2',
          email: 'seller2@gmail.com',
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
