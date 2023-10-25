const express = require('express')
const partidaRouter = express.Router()
const partidaController = require('../controllers/partidaController')
const checkToken = require('../helpers/check-token')

partidaRouter.post('/create',checkToken,partidaController.createPartida)
partidaRouter.get('/all',checkToken,partidaController.getPartidas)
partidaRouter.delete('/:idPartida',checkToken,partidaController.deletePartidas)

module.exports = partidaRouter