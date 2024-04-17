const express = require('express')
const partidaRoutes = express.Router()
const partidaController = require('../controllers/partidaController')
const checkToken = require('../helpers/check-token')

partidaRoutes.post('/create',checkToken, partidaController.createPartida)
partidaRoutes.get('/all',checkToken, partidaController.getPartidas)
partidaRoutes.get('/get/:idCampeonato',checkToken, partidaController.getPartidasByCamp)
partidaRoutes.get('/IDs/:idCampeonato',checkToken, partidaController.getIDPartidasByCamp)
partidaRoutes.delete('/:idPartida',checkToken, partidaController.deletePartidas)
partidaRoutes.get('/status', checkToken, partidaController.getPartidaByStatus)
partidaRoutes.get('/status/:idPartida', checkToken, partidaController.updatePartidaStatus)
partidaRoutes.get('/:idPartida', checkToken, partidaController.getPartidaById)
partidaRoutes.put('/:idPartida', checkToken, partidaController.updatePartidaByID)

module.exports = partidaRoutes