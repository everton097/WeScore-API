const express = require('express')
const jogadorRouter = express.Router()
const JogadorController = require('../controllers/jogadorController')

jogadorRouter.post('/create',JogadorController.createJogador)
jogadorRouter.get('/all',JogadorController.getAllJogador)

module.exports = jogadorRouter