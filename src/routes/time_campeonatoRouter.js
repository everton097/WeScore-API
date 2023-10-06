const express = require('express')
const routerTime_campeonato = express.Router()
const time_campeonatoController = require('../controllers/time_campeonatoController')


//Rotas para time_campeonato
routerTime_campeonato.get('/all', time_campeonatoController.getAllCampeonato)
routerTime_campeonato.post('/linkTimes', time_campeonatoController.linkTimesCampeonato)

module.exports = routerTime_campeonato