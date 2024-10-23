const Substituicao = require('../models/substituicao')
const Ponto = require('../models/ponto')
const Partida = require('../models/partida')
const Time = require('../models/time')
const Posicao = require('../models/posicao')
const Set = require('../models/set')

exports.createSubstituicao = async (req, res) => {
    const { idJogadorSai, idJogadorEntra } = req.body
    // Validaçoes 
    if (!idJogadorSai) {
        return res.status(400).json({ error: `O campo 'idJogadorSai' é obrigatorio.` })
    }
    if (!idJogadorEntra) {
        return res.status(400).json({ error: `O campo 'idJogadorEntra' é obrigatorio.` })
    }
    try {
        // Verifica se o Jogador que saiu esta em quadra
        const posicoes = await Posicao.findOne({
            order: [
                ['idPosicao', 'DESC'], // Ordenar por local em ordem descendente
            ],
            include: ['posicaoes_partida'],
            where: { idJogador: idJogadorSai },
        });

        console.log("Debuger, OBJ", posicoes);
        console.log("Debuger, posicoesOBJ", JSON.stringify(posicoes));
        if (!posicoes) {
            return res.status(400).json({ error: "Jogador que saiu não esta em quadra." })
        }
        // Verifique se a substituição já existe
        const substituicaoExistente = await Substituicao.findOne(
            {
                where: {
                    idJogadorEntrou: idJogadorEntra,
                    idJogadorSaiu: idJogadorSai,
                }
            }
        )
        console.log("Debuger, substituicaoExistenteOBJ", substituicaoExistente);

        if (substituicaoExistente) {
            return res.status(400).json({ error: "Substituição ja realizada." })
        } else {
            // Se jogador ainda não foi substituido Cria a substituição
            const newSubstituicao = await Substituicao.create({
                idJogadorEntrou: idJogadorEntra,
                idJogadorSaiu: idJogadorSai,
                idPosicao: posicoes.idPosicao,
                idPonto: posicoes.idPonto,
                idTime: posicoes.posicaoes_partida.idTime,
            })
            // Cria posição do jogador substituido em quadra
            const newPosicao = await Posicao.create({
                local: posicoes.local,
                ladoQuadra: posicoes.ladoQuadra,
                idPonto: posicoes.idPonto,
                idPartida: posicoes.idPartida,
                idJogador: idJogadorEntra,
            })
            return res.status(200).json({
                "substituicao": newSubstituicao,
                "newPosicao": newPosicao
            })
        }
    } catch (error) {
        console.log(`Erro ao tentar criar uma nova substituição.`)
        res.status(500).json({ error: `Erro interno do servidor ao tentar criar uma nova substituição para o ponto.` })
    }
}
// Get das subistituiçoes realizadas na partida em tal set
exports.getSubstituicoesByIdPartida = async (req, res) => {
    const { idPartida } = req.params
    const { idSet } = req.body
    // Validaçoes
    if (!idPartida) {
        return res.status(400).json({ error: `O campo 'idPartida' é obrigatorio.` })
    }
    if (!idSet) {
        return res.status(400).json({ error: `O campo 'idSet' é obrigatorio.` })
    }
    try {
        // Verifica se a Partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
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

        if (!substituicoes) {
            return res.status(404).json({ error: "Substituições não encontradas." })
        }
        return res.status(200).json(substituicoes)
    } catch (error) {
        console.log(`Erro ao tentar buscar as substituições.`)
        res.status(500).json({ error: `Erro interno do servidor ao tentar buscar as substituições.` })
    }
}