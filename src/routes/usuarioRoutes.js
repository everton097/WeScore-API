const express = require('express')
const routerUsuario = express.Router()

const usuarioController = require('../controllers/usuarioController')

const fs = require('fs')
const path = require('path')
const multer = require('multer')

//Configuração do multer para tratar os arquivos
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/upload/img/usuario'))
    },
    filename : (req,file,cb) => {
        const filename = Date.now() + path.extname(file.originalname)
        cb(null,filename)
    }
})

const upload = multer({storage})

//Rotas para Time
routerUsuario.post('/create', upload.single('logoUsuario'), usuarioController.createUsuario)

module.exports = routerUsuario