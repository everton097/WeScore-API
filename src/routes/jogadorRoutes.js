const express = require('express')
const jogadorRouter = express.Router()
const JogadorController = require('../controllers/jogadorController')

jogadorRouter.get('/listarJogadores',JogadorController.listarJogadores)
jogadorRouter.post('/cadastrarJogadores',JogadorController.cadastrarJogadores)
jogadorRouter.delete('/removeJogador::idJogador',JogadorController.removeJogador)

module.exports = jogadorRouter