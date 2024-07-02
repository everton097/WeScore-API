'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posicaos', 'ladoQuadra', {
      type: Sequelize.ENUM('Esquerda', 'Direita'),
      allowNull: false,
    });

    await queryInterface.changeColumn('posicaos', 'posicao', {
      type: Sequelize.ENUM('Ponteiro1', 'Central1', 'Libero', 'Levantador', 'Ponteiro2', 'Central2', 'Oposto'),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('posicaos', 'ladoQuadra');

    await queryInterface.changeColumn('posicaos', 'posicao', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
