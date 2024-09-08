const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')
const Pontos = require('../models/ponto')
const Posicao = require('../models/posicao')
const Set = require('../models/set')

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
    status: {
        type: DataTypes.ENUM('Aguardando', 'Em Andamento', 'Finalizado'),
        allowNull: false,
        defaultValue: 'Aguardando'
    }
})
//Pontos pertence a uma Partida 1-1 (Pontos tem uma Partida)
Pontos.belongsTo(Partida,{
    constraints: true,
    foreignKey: 'idPartida',
    as: 'partida'
})
Posicao.belongsTo(Partida, {
    constraints: true,
    foreignKey: 'idPartida',
    as: 'partida'
});
// Modelo Partida
Partida.hasMany(Set, {
    foreignKey: 'idPartida', // Define a chave estrangeira na tabela Set
    as: 'sets'
});
module.exports=Partida