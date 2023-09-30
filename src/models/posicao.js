const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')

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

module.exports=Posicao