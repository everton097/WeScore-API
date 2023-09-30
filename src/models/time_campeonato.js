const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')

const Time_Campeonato = sequelize.define('Time_Campeonato', {
    idTime_Campeonato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }    
})

module.exports=Time_Campeonato