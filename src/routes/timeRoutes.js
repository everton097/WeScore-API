const express = require('express')
const routerTime = express.Router()

const timeController = require('../controllers/timeController')

const fs = require('fs')
const path = require('path')
const multer = require('multer')

//Configuração do multer para tratar os arquivos
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/upload/img/time'))
    },
    filename : (req,file,cb) => {
        const filename = Date.now() + path.extname(file.originalname)
        cb(null,filename)
    }
})

const upload = multer({storage})

//Rotas para Time
routerTime.post('/createtime', upload.single('logoTime'), timeController.createTime)

module.exports = routerTime