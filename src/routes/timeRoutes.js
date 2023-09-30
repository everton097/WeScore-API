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

// Middleware para verificar se uma imagem foi enviada
const validateImage = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
    }
    // Se chegou até aqui, a imagem foi enviada
    next();//passa o controle para o próximo middleware ou rota
}

//Rotas para Time
routerTime.post('/create', upload.single('logoTime'), validateImage, timeController.createTime)

module.exports = routerTime