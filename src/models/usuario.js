const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nomeUsuario : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    email : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    senha : {
        type : DataTypes.STRING(50),
        allowNull : false
    },
    logoUsuario : {
        type : DataTypes.STRING(255),
        allowNull : false
    }
})



module.exports=Usuario