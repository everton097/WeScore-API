const express = require('express')
const posicaoRoutes = express.Router()
const controllerPosicao = require('../controllers/posicaoController')
const checkToken = require('../helpers/check-token')

posicaoRoutes.post('/create',checkToken, controllerPosicao.createPosicao)
posicaoRoutes.get('/allLastByPoint/:idPonto',checkToken, controllerPosicao.getLastPosicoes)

module.exports = posicaoRoutes