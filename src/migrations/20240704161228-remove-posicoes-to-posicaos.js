'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('posicaos', 'posicao')
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('posicaos', 'posicao', {
      type: Sequelize.ENUM('Ponteiro1', 'Central1', 'Libero', 'Levantador', 'Ponteiro2', 'Central2', 'Oposto'),
      allowNull: false
    });
  }
};
