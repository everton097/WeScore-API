const express = require('express')
const routerSubstituicao = express.Router()
const substituicaoController = require('../controllers/substituicaoController')
const checkToken = require('../helpers/check-token')

routerSubstituicao.post('/create/:idTime',checkToken , substituicaoController.createSubstituicao)
routerSubstituicao.get('/getAll',checkToken , substituicaoController.getSubstituicoes)
routerSubstituicao.get('/teste', substituicaoController.teste)


module.exports = routerSubstituicao