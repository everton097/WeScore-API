'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Substituicaos', 'posicao');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Substituicaos', 'posicao', {
      type: Sequelize.STRING(15),
      allowNull: false
    });
  }
};
