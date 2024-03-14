const express = require('express')
const routerTime_campeonato = express.Router()
const time_campeonatoController = require('../controllers/time_campeonatoController')
const checkToken = require('../helpers/check-token')


//Rotas para time_campeonato
routerTime_campeonato.get('/all',checkToken, time_campeonatoController.getAllCampeonato)
routerTime_campeonato.get('/:idCampeonato',checkToken, time_campeonatoController.getTimesByCampeonato)
routerTime_campeonato.post('/enroll',checkToken, time_campeonatoController.enrollTimesCampeonato)
routerTime_campeonato.delete('/:idCampeonato/time/:idTime',checkToken, time_campeonatoController.deleteTimesCampeonato)

module.exports = routerTime_campeonato