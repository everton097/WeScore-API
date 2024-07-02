const { DataTypes } = require("sequelize");
const sequelize = require("../conn/connection");
const Substituicao = require("../models/substituicao");

const Posicao = sequelize.define("Posicao", {
	idPosicao: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	posicao: {
		type: DataTypes.ENUM(
			"Ponteiro1",
			"Central1",
			"Libero",
			"Levantador",
			"Ponteiro2",
			"Central2",
			"Oposto"
		),
		allowNull: false,
	},
    ladoQuadra: {
        type: DataTypes.ENUM('Esquerda', 'Direita'),
        allowNull: false,
    },
});
Substituicao.belongsTo(Posicao, {
	constraints: true,
	foreignKey: "idPosicao",
});
module.exports = Posicao;
