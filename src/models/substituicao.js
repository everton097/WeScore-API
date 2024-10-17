const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')

const Substituicao = sequelize.define('Substituicao', {
    idSubstituicao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idJogadorEntrou : {
        type: DataTypes.INTEGER(2),
        allowNull : false
    },
    idJogadorSaiu : {
        type: DataTypes.INTEGER(2),
        allowNull : false
    },
})

module.exports=Substituicao