const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')
const Campeonato = require('./campeonato')
const Time_Campeonato = require('./time_campeonato')
const Usuario = require('./usuario')

const Time = sequelize.define('Time', {
    idTime: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nomeTime : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    logoTime : {
        type : DataTypes.STRING(255),
        allowNull : false
    }
})
//Relacionamentos

//Time pertence a um Usuario 1-1
Time.belongsTo(Usuario,{
    constraints: true,
    foreignKey: 'idUsuario'
})

//Usuario pertence a muitos 1-n
Usuario.hasMany(Time,{
    foreignKey: 'idUsuario'
})

//Time pertence a muitos n:m
Time.belongsToMany(Campeonato, {
    through: {
        model: Time_Campeonato
    },
     foreignKey: 'idTime',
     constraints: true
    })

//Time pertence a muitos n:m
Campeonato.belongsToMany(Time, {
    through: {
        model: Time_Campeonato
    },
     foreignKey: 'idCampeonato',
     constraints: true
    })
module.exports=Time