const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')
const Substituicao = require('../models/substituicao')
const Posicao = require('../models/posicao')

const Ponto = sequelize.define('Ponto', {
    idPonto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    ptTime1 : {
        type: DataTypes.INTEGER(1),
        allowNull : false
    },
    ptTime2 : {
        type: DataTypes.INTEGER(1),
        allowNull : false
    },
    set : {
        type: DataTypes.INTEGER(1),
        allowNull : false
    }
})

//Substituicao pertence a um Ponto 1-1 (Substituicao tem um Ponto)
Substituicao.belongsTo(Ponto,{
    constraints: true,
    foreignKey: 'idPonto'
})
//Posicao pertence a um Ponto 1-1 (Posicao tem um Ponto)
Posicao.belongsTo(Ponto,{
    constraints: true,
    foreignKey: 'idPonto'
})

module.exports=Ponto