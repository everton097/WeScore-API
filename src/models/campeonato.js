const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')
const Usuario = require('../models/usuario')
const Partida = require('../models/partida')
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
    },
    status: {
        type: DataTypes.ENUM('Aguardando', 'Em Andamento', 'Finalizado'),
        allowNull: false,
        defaultValue: 'Aguardando'
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
//Partida pertence a um Campeonato 1-1 (Partida tem um Campeonato)
Partida.belongsTo(Campeonato,{
    constraints: true,
    foreignKey: 'idCampeonato',
    as:'campeonato_partida'
})

module.exports=Campeonato