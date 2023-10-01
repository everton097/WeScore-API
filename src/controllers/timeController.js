const { Op } = require('sequelize')//para utilizar like
const Time = require('../models/time')
const Usuario = require('../models/usuario')
const Jogador = require('../models/jogador')

exports.createTime = async (req,res) => {
    try {
        const {nomeTime, idUsuario} = req.body
        const logoTime = req.file.filename
        //Validações
        if(!nomeTime){
            res.status(400).json({error : `O campo 'nomeTime' é obrigatorio.`})
            return
        }
        if(!idUsuario){
            res.status(400).json({error : `O campo 'idUsuario' é obrigatorio.`})
            return
        }
        //Verifica se o time já existe
        const timeExists = await Time.findOne({
            where : {nomeTime : { [Op.like] : nomeTime }}
        })
        if(timeExists){
            res.status(422).json({message : `Time já existe.`})
            return
        }
        //Verifica se o usuario existe
        const usuarioExists = await Usuario.findOne({
            where : {idUsuario : { [Op.like] : idUsuario }}
        })
        if(!usuarioExists){
            res.status(404).json({message : `Usuario não existe.`})
            return
        }

        //Cria o time
        const time = await Time.create({
            nomeTime, logoTime, idUsuario
        })
        res.status(200).json({
            status: 'success',
            data: time
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Erro ao criar o Time.`})
    }
}
exports.getAllTime = async (req, res) => {
    try {
      const times = await Time.findAll({
        include: [{ model: Usuario, attributes: ['nomeUsuario']}],
      });
  
      if (times) {
        res.json(times);
      } else {
        res.status(404).json({ error: 'Nenhum time encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar times:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
exports.getAllTime1 = async (req, res) => {
    const time = await Time.findAll({ include: [{model: Usuario, attributes: ['nomeUsuario']}] });
    console.log(time);
    res.json(time);
}