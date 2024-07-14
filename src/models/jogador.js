const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')
const Posicao = require('../models/posicao')

const Jogador = sequelize.define('Jogador', {
    idJogador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nomeJogador : {
        type: DataTypes.STRING(50),
        allowNull : false
    },
    sobrenome : {
        type: DataTypes.STRING(100),
        allowNull : false
    },
    cpf : {
        type: DataTypes.STRING(11),
        allowNull : false
    },
    telefone : {
        type: DataTypes.STRING(11),
        allowNull : false
    },
    numeroCamiseta : {
        type: DataTypes.INTEGER(2),
        allowNull : false
    },
})


//Jogador pertence a uma Posicao 1-1 (Jogador tem uma Posicao)
Posicao.belongsTo(Jogador,{
    constraints: true,
    foreignKey: 'idJogador',
    as:'posicaoes_partida'
})
module.exports=Jogador