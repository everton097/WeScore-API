const { Op } = require('sequelize')//para utilizar like
const Time = require('../models/time')
const Jogador = require('../models/jogador')

exports.createJogador = async (req,res) => {
    try {

        const {nomeJogador, sobrenome,cpf, telefone, numeroCamiseta, idTime} = req.body
        //Validações
        if(!nomeJogador){
            return res.status(400).json({error : `O campo 'nome' é obrigatorio.`})
        }
        if(!sobrenome){
            return res.status(400).json({error : `O campo 'sobrenome' é obrigatorio.`})
        }
        if(!cpf){
            return res.status(400).json({error : `O campo 'cpf' é obrigatorio.`})
        }
        if(!telefone){
            return res.status(400).json({error : `O campo 'telefone' é obrigatorio.`})
        }
        if(!numeroCamiseta){
            return res.status(400).json({error : `O campo 'numeroCamiseta' é obrigatorio.`})
        }
        if(!idTime){
            return res.status(400).json({error : `O campo 'idTime' é obrigatorio.`})
        }
        //Verifica se o jogador já existe
        const jogadorExists = await Jogador.findOne({
            where : {cpf : { [Op.like] : cpf }}
        })
        if(jogadorExists){
            return res.status(422).json({message : `Jogador já existe.`})
        }
        //Verifica se o time existe
        const timeExists = await Time.findOne({
            where : {idTime : idTime }
        })
        if(!timeExists){
            return res.status(404).json({message : `Time não existe.`})
        }
        /*console.log(`Nome: ${nome}`) */
        //Cria o jogador
        console.log(`ID time: `+idTime, nomeJogador, sobrenome,cpf, telefone, numeroCamiseta)
        const jogador = await Jogador.create({
            idTime, nomeJogador, sobrenome,cpf, telefone, numeroCamiseta
        })
        res.status(200).json({
            status: 'success',
            data: jogador
        })
                
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Erro ao criar jogador.`})
    }
}
exports.getAllJogador = async (req, res) => {
    try {
      const jogador = await Jogador.findAll({include: [{ model: Time, attributes: ['nomeTime']}]});
  
      if (jogador) {
        res.json(jogador);
      } else {
        res.status(404).json({ error: 'Nenhum time encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar Jogadors:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
