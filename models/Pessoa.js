const { DataTypes } = require('sequelize')
const db = require ('../db/conn')

const Tarefa = db.define('Pessoa', {
    cpf : {
        type : DataTypes.STRING,
        allowNull : false
    },
    Nome : {
        type : DataTypes.STRING,
    },
    Sobrenome : {
        type : DataTypes.STRING,
    },
    sexo : {
        type : DataTypes.STRING,
    },
    concluida: {
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
})
module.exports = Pessoa