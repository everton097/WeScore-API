const { Op } = require('sequelize')//para utilizar like
const Usuario = require('../models/usuario')
const path = require('path')
const fs = require('fs')
const bycrypt = require('bcryptjs')

exports.createUsuario = async (req,res) => {
    try {
        const {nomeUsuario, email, senha} = req.body
        const logoUsuario = req.file.filename
        //Criptografar a senha
        const salt = bycrypt.genSaltSync(10)
        const hashSenha = bycrypt.hashSync(senha,salt)

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
            where : {email : { [Op.like] : `%${email}%` }}
        })
        if(usuarioExists){
            res.status(422).json({message : `Usuario já existe.`})
            return
        }

        const usuario = await Usuario.create({
            nomeUsuario, email, senha : hashSenha, logoUsuario
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
exports.updateUsuario = async (req,res) => {
    try {
        const { idUsuario } = req.params;
        const {nomeUsuario, email, senha} = req.body
        const logoUsuario = req.file.filename
        //Criptografar a senha
        const salt = bycrypt.genSaltSync(10)
        const hashSenha = bycrypt.hashSync(senha,salt)

        if(!idUsuario){
            return res.status(400).json({error : `O campo 'idUsuario' é obrigatorio.`})
        }
        const update = await Usuario.findByPk(idUsuario)
        if (!update) {
            return res.status(404).json({ error: 'Usuario não encontrado.' });
        }
        //Validações
        if(!nomeUsuario){
            return res.status(400).json({error : `O campo 'nomeUsuario' é obrigatorio.`})
        }else{update.nomeUsuario = nomeUsuario}
        if(!email){
            return res.status(400).json({error : `O campo 'email' é obrigatorio.`})
        }else{update.email = email}
        if(!senha){
            return res.status(400).json({error : `O campo 'senha' é obrigatorio.`})
        }else{update.senha = hashSenha}
        if (logoUsuario) {
            const diretorio = path.join('./public/upload/img/usuario/'+update.logoUsuario)
            fs.unlinkSync(diretorio, (err) => {
                if (err) {
                    return console.error(err)
                }
            })
            update.logoUsuario = logoUsuario
        }
        
        await update.save();

        res.status(200).json({
            status: 'success',
            data: update
        })
    } catch (error) {
        console.log(`Erro ao atualizar o Usuario.` + error)
        res.status(500).json({error : `Erro ao atualizar o Usuario.`})
    }
}
exports.deleteUsuario = async (req,res) => {
    const {idUsuario} = req.params
    try {
      //Validações
      if(!idUsuario){
        return res.status(400).json({error : `O campo 'idUsuario' é obrigatorio.`})
      }
      const get = await Usuario.findByPk(idUsuario)
      if (get) {
        const diretorio = path.join('./public/upload/img/usuario/'+get.logoUsuario)
        fs.unlinkSync(diretorio, (err) => {
          if (err) {
            return console.error(err)
          }
        })
      }
      const deleted = await Usuario.destroy({
        where : { idUsuario }
      })
      if(deleted){
          res.status(200).json({message : `Usuario excluído com sucesso!`})
      } else {
          res.status(404).json({error : `Usuario não encontrado!`})
      }
    } catch (error) {
        console.error(`Erro ao deletar ${error}`)
        res.status(500).json({error:`Erro ao excluir o Usuario.`})        
    }
  }