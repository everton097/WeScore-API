const express = require('express')
const jogadorRouter = express.Router()
const JogadorController = require('../controllers/jogadorController')
const checkToken = require('../helpers/check-token')

jogadorRouter.post('/create',checkToken, JogadorController.createJogador)
jogadorRouter.get('/all',checkToken, JogadorController.getAllJogador)
jogadorRouter.get('/nolink',checkToken, JogadorController.getJogadorNoLink)
jogadorRouter.get('/:idJogador',checkToken, JogadorController.getJogadorByID)
jogadorRouter.put('/disenroll',checkToken, JogadorController.disenrollJogador)
jogadorRouter.put('/:idJogador',checkToken, JogadorController.updateJogador)
jogadorRouter.delete('/:idJogador',checkToken, JogadorController.deleteJogador)

module.exports = jogadorRouter