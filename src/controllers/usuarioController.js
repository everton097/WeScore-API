const { Op } = require('sequelize')//para utilizar like
const Usuario = require('../models/usuario')

exports.createUsuario = async (req,res) => {
    try {
        const {nomeUsuario, email, senha} = req.body
        const logoUsuario = req.file.filename
        //Validações
        if(!nomeUsuario){
            res.status(400).json({error : `O campo 'nomeUsuario' é obrigatorio.`})
            return
        }
        if(!email){
            res.status(400).json({error : `O campo 'email' é obrigatorio.`})
            return
        }
        if(!senha){
            res.status(400).json({error : `O campo 'senha' é obrigatorio.`})
            return
        }
        //Verifica se o usuario já existe
        const usuarioExists = await Usuario.findOne({
            where : {email : { [Op.like] : email }}
        })
        if(usuarioExists){
            res.status(422).json({message : `Usuario já existe.`})
            return
        }

        const usuario = await Usuario.create({
            nomeUsuario, email, senha, logoUsuario
        })
        res.status(200).json({
            status: 'success',
            data: usuario
        })
    } catch (error) {
        console.log(`Erro ao criar o Usuario.` + error)
        res.status(500).json({error : `Erro ao criar o Usuario.`})
    }
}
exports.getAllUsuario = async (req, res) => {
    try {
      const usuario = await Usuario.findAll();
  
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Nenhum usuario encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar usuario:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}