const express = require('express')
const pontoRoutes = express.Router()
const pontoController = require('../controllers/pontosController')
const checkToken = require('../helpers/check-token')

pontoRoutes.get('/create/:idPartida',checkToken , pontoController.createPonto)
pontoRoutes.post('/plus/:idPartida',checkToken , pontoController.plusPonto)
pontoRoutes.delete('/minus/:idPartida',checkToken , pontoController.minusPonto)
pontoRoutes.get('/last/:idPartida',checkToken , pontoController.getLastPontoByPartida)
pontoRoutes.get('/:idPartida',checkToken , pontoController.getAllPontosByPartida)

module.exports = pontoRoutes