const { Op } = require('sequelize')//para utilizar like
const Usuario = require('../models/usuario')

exports.createUsuario = async (req,res) => {
    try {
        const {nomeUsuario, email, senha} = req.body
        const logoUsuario = req.file.filename

        const usuario = await Usuario.create({
            nomeUsuario, email, senha, logoUsuario
        })
        res.status(200).json({
            status: 'success',
            data: usuario
        })
    } catch (error) {
        console.log(`Erro ao criar o Usuario.` + error)
        res.status(500).json({error : `Erro ao criar o Usuario.`})
    }
}