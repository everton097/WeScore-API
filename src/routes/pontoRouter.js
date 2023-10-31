const express = require('express')
const pontoRouter = express.Router()
const pontoController = require('../controllers/pontosController')
const checkToken = require('../helpers/check-token')

pontoRouter.get('/create/:idPartida', pontoController.createPonto)
pontoRouter.post('/plus/:idPartida', pontoController.plusPonto)
pontoRouter.delete('/minus/:idPartida', pontoController.minusPonto)

module.exports = pontoRouter