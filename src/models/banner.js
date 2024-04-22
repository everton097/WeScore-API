const { DataTypes } = require('sequelize')
const sequelize = require('../conn/connection')

const Banner = sequelize.define('Banner', {
    idBanner: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    titulo : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    descricao : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    link : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    imagem : {
        type : DataTypes.STRING(255),
        allowNull : false,
        defaultValue: 'BannerDefault.png'
    },
    ordem: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports=Banner