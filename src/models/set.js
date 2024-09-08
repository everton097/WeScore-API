const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');
const Ponto = require("../models/ponto");
const Partida = require('../models/partida')

const Set = sequelize.define('Set', {
    idSet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    numeroSet: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vencedorSet: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    placarTime1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    placarTime2: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Relacionamento 1-N entre Set e Ponto (um set tem vários pontos)
Set.hasMany(Ponto, {
    foreignKey: 'idSet',
    as: 'set_pontos'
});

Ponto.belongsTo(Set, {
    foreignKey: 'idSet',
    as: 'pontos_set'
})


module.exports = Set;
