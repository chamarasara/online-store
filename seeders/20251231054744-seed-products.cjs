'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'iPhone 15',
          price: 1200,
          inventory: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'MacBook Air M2',
          price: 1800,
          inventory: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'AirPods Pro',
          price: 249,
          inventory: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
