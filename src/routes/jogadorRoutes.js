const express = require('express')
const jogadorRouter = express.Router()
const JogadorController = require('../controllers/jogadorController')

jogadorRouter.post('/create',JogadorController.createJogador)

module.exports = jogadorRouter