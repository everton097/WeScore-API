const express = require('express')
const routerSubstituicao = express.Router()
const substituicaoController = require('../controllers/substituicaoController')
const checkToken = require('../helpers/check-token')

routerSubstituicao.post('/create',checkToken , substituicaoController.createSubstituicao)
routerSubstituicao.post('/all/:idPartida',checkToken , substituicaoController.getSubstituicoesByIdPartida)


module.exports = routerSubstituicao