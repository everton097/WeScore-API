const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')
const Usuario = require('../models/usuario')
const Campeonato = sequelize.define('Campeonato', {
    idCampeonato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nomeCampeonato : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    logoCampeonato : {
        type : DataTypes.STRING(255),
        allowNull : false
    }
})
//Relacionamentos

//Campeonato pertence a um Usuario 1-1
Campeonato.belongsTo(Usuario,{
    constraints: true,
    foreignKey: 'idUsuario'
})

//Usuario pertence a muitos 1-n
Usuario.hasMany(Campeonato,{
    foreignKey: 'idUsuario'
})

module.exports=Campeonato