'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('posicaos', 'idPartida', {
      type: Sequelize.INTEGER,
      references: {
        model: 'partidas', // Nome da tabela de referência
        key: 'idPartida', // Chave primária da tabela de referência
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // ou 'CASCADE', 'RESTRICT', dependendo da sua necessidade
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('posicaos', 'idPartida');
  }
};
