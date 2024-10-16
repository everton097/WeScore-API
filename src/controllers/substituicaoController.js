const Substituicao = require('../models/substituicao')
const Ponto = require('../models/ponto')
const Partida = require('../models/partida')
const Time = require('../models/time')
const Posicao = require('../models/posicao')
const Set = require('../models/set')

exports.createSubstituicao = async (req,res) =>{
    const { idPartida } = req.params
    const { idJogadorSai, idJogadorEntra, idTime } = req.body
    // Validaçoes 
    if(!idTime){
        return res.status(400).json({error : `O campo 'idTime' é obrigatorio.`})
    }
    if(!idJogadorSai){
        return res.status(400).json({error : `O campo 'idJogadorSai' é obrigatorio.`})
    }
    if(!idJogadorEntra){
        return res.status(400).json({error : `O campo 'idJogadorEntra' é obrigatorio.`})
    }
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    try {
        // Verifica se o Jogador que saiu esta em quadra
        const posicoes = await Posicao.findOne({
            order: [
              ['idPosicao', 'ASC'], // Ordenar por local em ordem descendente
            ],
            include: ['posicaoes_partida'],
            where: { idJogadorSai },
        });
        if(posicoes.length == 0){
            return res.status(400).json({ error: "Jogador que saiu não esta em quadra." })
        }
        // mexendo aqui
        // Verifique se a substituição já existe
        const substituicaoExistente = await Substituicao.findOne(
            { where: { idJogadorSaiu: idJogadorSai, idJogadorEntrou: idJogadorEntra, idTime : idTime, set: set },order: [['createdAt', 'DESC']] }
            //{ where: { idPonto : ponto.idPonto, idJogadorSaiu: idJogadorSai, idJogadorEntrou: idJogadorEntra, idTime : idTime },order: [['createdAt', 'DESC']] }
        )
        if(substituicaoExistente){
            return res.status(400).json({ error: "Substituição ja realizada." })
        }else{
            // Verifica se Jogador ja foi subistituido no set
            const subsJogador = await Substituicao.findOne({ where: { idJogadorSaiu: idJogadorEntra, idTime : idTime, set : set },order: [['createdAt', 'DESC']] })
            if(subsJogador){
                if(subsJogador.idJogadorEntrou == idJogadorSai){
                    // Cria a substituição
                    const newSubstituicao = await Substituicao.create({
                        idJogadorSaiu: idJogadorSai, idJogadorEntrou: idJogadorEntra, posicao, idPonto : ponto.idPonto,  idTime, set: ponto.dataValues.set
                    })
                    return res.status(200).json({ data: newSubstituicao })
                }else{
                    return res.status(400).json({ error: "Jogador não pode entrar em uma posição diferente da qual saiu." })
                }
            }
            // Se jogador ainda não foi substituido Cria a substituição
            const newSubstituicao = await Substituicao.create({
                idJogadorSaiu: idJogadorSai, idJogadorEntrou: idJogadorEntra, posicao, idPonto : ponto.idPonto,  idTime, set: ponto.dataValues.set
            }) 
        
            return res.status(200).json({ data: newSubstituicao })
        }
    } catch (error) {
        console.log(`Erro ao tentar criar uma nova substituição.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar criar uma nova substituição para o ponto.`})
    }
}
// Get das subistituiçoes realizadas na partida em tal set
exports.getSubstituicoesByIdPartida = async (req,res) =>{
    const { idPartida } = req.params
    const { idSet } = req.body
    // Validaçoes
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    if(!idSet){
        return res.status(400).json({error : `O campo 'idSet' é obrigatorio.`})
    }
    try {        
        // Verifica se a Partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida){
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Busca as substituições
        const substituicoes = await Substituicao.findAll({
            order: [['createdAt', 'ASC']],
            include: [
                {
                    model: Ponto,
                    as: 'ponto',
                    where: { idPartida: idPartida, idSet: idSet },
                },
                { model: Posicao }
            ]
        })
        
        if (!substituicoes){
            return res.status(404).json({ error: "Substituições não encontradas." })
        }
        return res.status(200).json(substituicoes)
    } catch (error) {
        console.log(`Erro ao tentar buscar as substituições.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar buscar as substituições.`})
    }
}