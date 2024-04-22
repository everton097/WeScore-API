const express = require('express')
const routerBanner = express.Router()
const dotenv  = require('dotenv')
dotenv.config()

const bannerController = require('../controllers/bannerController')
const checkToken = require('../helpers/check-token')

const fs = require('fs')
const path = require('path')
const multer = require('multer')

//Configuração do multer para tratar os arquivos
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/upload/img/banner'))
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

// Rotas para banners
routerBanner.post('',checkToken,upload.single('imagem'), bannerController.createBanner);
routerBanner.get('', bannerController.getAllBanners);
routerBanner.get('/search', bannerController.searchBannersByTitle);
routerBanner.get('/:id', bannerController.getBannerById);
routerBanner.put('/:id',checkToken, upload.single('imagem'), bannerController.updateBanner);
routerBanner.delete('/:id',checkToken, bannerController.deleteBanner);

module.exports = routerBanner