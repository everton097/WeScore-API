const express = require('express')
const setRoutes = express.Router()
const setController = require('../controllers/setController')
const checkToken = require('../helpers/check-token')

setRoutes.put('/:idSet',checkToken , setController.updateSetByID)

module.exports = setRoutes