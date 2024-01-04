const express = require('express')
const partidaRoutes = express.Router()
const partidaController = require('../controllers/partidaController')
const checkToken = require('../helpers/check-token')

partidaRoutes.post('/create',checkToken, partidaController.createPartida)
partidaRoutes.get('/all',checkToken, partidaController.getPartidas)
partidaRoutes.get('/:idCampeonato',checkToken, partidaController.getPartidasCamp)
partidaRoutes.delete('/:idPartida',checkToken, partidaController.deletePartidas)
partidaRoutes.get('/status', checkToken, partidaController.getPartidaByStatus)
partidaRoutes.get('/status/:idPartida', checkToken, partidaController.updatePartidaStatus)
partidaRoutes.get('/get/:idPartida', checkToken, partidaController.getPartidaCampeonatoById)

module.exports = partidaRoutes