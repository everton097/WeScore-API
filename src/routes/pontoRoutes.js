const express = require('express')
const pontoRoutes = express.Router()
const pontoController = require('../controllers/pontosController')
const checkToken = require('../helpers/check-token')

pontoRoutes.get('/create/:idPartida',checkToken , pontoController.createPonto)
pontoRoutes.post('/plus/:idPartida',checkToken , pontoController.plusPonto)
pontoRoutes.get('/last/:idPartida',checkToken , pontoController.getLastPontoByPartida)
pontoRoutes.put('/initial/:idPartida',checkToken , pontoController.updatePontoInicial)
pontoRoutes.post('/next-set/:idPartida',checkToken , pontoController.createNewSet)
pontoRoutes.get('/:idPartida',checkToken , pontoController.getAllPontosByPartida)

module.exports = pontoRoutes