const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')
const Pontos = require('../models/ponto')

const Partida = sequelize.define('Partida', {
    idPartida: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    qtdeSets : {
        type: DataTypes.INTEGER(1),
        allowNull : false
    },
    rodada : {
        type: DataTypes.INTEGER(2),
        allowNull : false
    },
})
//Pontos pertence a uma Partida 1-1 (Pontos tem uma Partida)
Pontos.belongsTo(Partida,{
    constraints: true,
    foreignKey: 'idPartida'
})

module.exports=Partida