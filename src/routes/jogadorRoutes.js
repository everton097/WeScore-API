const express = require('express')
const jogadorRouter = express.Router()
const JogadorController = require('../controllers/jogadorController')

jogadorRouter.post('/create',JogadorController.createJogador)
jogadorRouter.get('/all',JogadorController.getAllJogador)
jogadorRouter.put('/:idJogador',JogadorController.updateJogador)
jogadorRouter.delete('/:idJogador',JogadorController.deleteJogador)

module.exports = jogadorRouter