'use strict';
/* npx sequelize-cli db:migrate */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('pontos', 'ladoQuadraTime1', {
          type: Sequelize.ENUM('Esquerda', 'Direita'),
          allowNull: true
      });
      await queryInterface.addColumn('pontos', 'ladoQuadraTime2', {
          type: Sequelize.ENUM('Esquerda', 'Direita'),
          allowNull: true
      });
      await queryInterface.addColumn('pontos', 'saqueInicial', {
          type: Sequelize.INTEGER,
          allowNull: true
      });
  },
  async down (queryInterface, Sequelize) {
      await queryInterface.removeColumn('pontos', 'ladoQuadraTime1');
      await queryInterface.removeColumn('pontos', 'ladoQuadraTime2');
      await queryInterface.removeColumn('pontos', 'saqueInicial');
  }
};