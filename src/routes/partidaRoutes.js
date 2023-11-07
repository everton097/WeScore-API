const express = require('express')
const partidaRoutes = express.Router()
const partidaController = require('../controllers/partidaController')
const checkToken = require('../helpers/check-token')

partidaRoutes.post('/create',checkToken,partidaController.createPartida)
partidaRoutes.get('/all',checkToken,partidaController.getPartidas)
partidaRoutes.delete('/:idPartida',checkToken,partidaController.deletePartidas)

module.exports = partidaRoutes