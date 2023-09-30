const { Op } = require('sequelize')//para utilizar like
const Time = require('../models/time')

exports.createTime = async (req,res) => {
    try {
        const {nomeTime} = req.body
        const logoTime = req.file.filename

        const time = await Time.create({
            nomeTime, logoTime
        })
        res.status(200).json({
            status: 'success',
            data: time
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Erro ao criar o Time.`})
    }
}