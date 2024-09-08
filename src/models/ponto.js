const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');
const Substituicao = require('../models/substituicao');
const Posicao = require('../models/posicao');

const Ponto = sequelize.define('Ponto', {
    idPonto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    ptTime1: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
    ptTime2: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
    ladoQuadraTime1: {
        type: DataTypes.ENUM('Esquerda', 'Direita'),
        allowNull: true
    },
    ladoQuadraTime2: {
        type: DataTypes.ENUM('Esquerda', 'Direita'),
        allowNull: true
    },
    saqueInicial: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

// Substituicao pertence a um Ponto 1-1 (Substituicao tem um Ponto)
Substituicao.belongsTo(Ponto, {
    constraints: true,
    foreignKey: 'idPonto',
    as: 'ptTime1'
});
// Posicao pertence a um Ponto 1-1 (Posicao tem um Ponto)
Posicao.belongsTo(Ponto, {
    constraints: true,
    foreignKey: 'idPonto'
});

module.exports = Ponto;