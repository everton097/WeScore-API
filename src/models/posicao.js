const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')
const Substituicao = require('../models/substituicao')

const Posicao = sequelize.define('Posicao', {
    idPosicao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    posicao : {
        type: DataTypes.STRING(15),
        allowNull : false
    },
})
Substituicao.belongsTo(Posicao,{
    constraints: true,
    foreignKey: 'idPosicao'
})
module.exports=Posicao