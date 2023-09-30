const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')

const Substituicao = sequelize.define('Substituicao', {
    idSubstituicao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idJogadorSaiu : {
        type: DataTypes.INTEGER(2),
        allowNull : false
    },
    idJogadorEntrou : {
        type: DataTypes.INTEGER(2),
        allowNull : false
    },
    posicao : {
        type: DataTypes.STRING(15),
        allowNull : false
    },
})

module.exports=Substituicao