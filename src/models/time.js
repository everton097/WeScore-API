const { DataTypes } = require("sequelize");
const sequelize = require("../conn/connection");
const Campeonato = require("./campeonato");
const Time_Campeonato = require("./time_campeonato");
const Usuario = require("./usuario");
const Partida = require("../models/partida");
const Jogador = require("../models/jogador");
const Ponto = require("../models/ponto");
const Substituicao = require("../models/substituicao");

const Time = sequelize.define("Time", {
	idTime: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	nomeTime: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	logoTime: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
});
//Relacionamentos

//Time pertence a um Usuario 1-1 (Time tem um usuario)
Time.belongsTo(Usuario, {
	constraints: true,
	foreignKey: "idUsuario",
});

//Partida pertence a um Time 1-1 (Partida tem um Time)
Partida.belongsTo(Time, {
	constraints: true,
	foreignKey: "idTime1",
	as: "Time1",
});
//Partida pertence a um Time 1-1 (Partida tem um Time)
Partida.belongsTo(Time, {
	constraints: true,
	foreignKey: "idTime2",
	as: "Time2",
});
//Ponto pertence a um Time 1-1 (Ponto tem um Time)
Ponto.belongsTo(Time, {
	constraints: true,
	foreignKey: "idTime",
	as: "time",
});
//Jogador pertence a um Time 1-n (Jogador tem um Time)
Time.hasMany(Jogador, {
	constraints: true,
	foreignKey: "idTime",
});
Jogador.belongsTo(Time, {
	constraints: true,
	foreignKey: "idTime",
});
Substituicao.belongsTo(Time, {
	constraints: true,
	foreignKey: "idTime",
});
//Time pertence a muitos n:m
Time.belongsToMany(Campeonato, {
	through: {
		model: Time_Campeonato,
	},
	foreignKey: "idTime",
	as: "time_campeonato",
	constraints: true,
});
Campeonato.belongsToMany(Time, {
	through: {
		model: Time_Campeonato,
	},
	foreignKey: "idCampeonato",
	as: "campeonato_time",
	constraints: true,
});

module.exports = Time;
