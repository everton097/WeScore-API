'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Cria a nova tabela 'Set'
    await queryInterface.createTable('Sets', {
      idSet: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idPartida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Partidas', // Tabela de partida
          key: 'idPartida'
        },
        onDelete: 'CASCADE'
      },
      numeroSet: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vencedor: {
        type: Sequelize.INTEGER, // Armazena o idTime vencedor do set
        allowNull: true
      },
      placarTime1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      placarTime2: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
      }
    });

    // Remove as colunas da tabela 'Ponto'
    await queryInterface.removeColumn('Pontos', 'vencedor');
    await queryInterface.removeColumn('Pontos', 'placarTime1');
    await queryInterface.removeColumn('Pontos', 'placarTime2');
    await queryInterface.removeColumn('Pontos', 'set');
  },

  async down (queryInterface, Sequelize) {
    // Adiciona as colunas de volta à tabela 'Pontos'
    await queryInterface.addColumn('Pontos', 'vencedor', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Pontos', 'set', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Pontos', 'placarTime1', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('Pontos', 'placarTime2', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });

    // Remove a tabela 'Set'
    await queryInterface.dropTable('Set');
  }
};
