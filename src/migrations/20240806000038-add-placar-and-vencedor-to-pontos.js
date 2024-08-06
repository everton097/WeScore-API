'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Pontos', 'placarTime1', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });

    await queryInterface.addColumn('Pontos', 'placarTime2', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });

    await queryInterface.addColumn('Pontos', 'vencedor', {
      type: DataTypes.INTEGER,
      allowNull: true
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pontos', 'placarTime1');
    await queryInterface.removeColumn('Pontos', 'placarTime2');
    await queryInterface.removeColumn('Pontos', 'vencedor');
  }
};
