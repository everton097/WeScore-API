const { Op } = require('sequelize')//para utilizar like
const Partida = require('../models/partida')
const Time = require('../models/time')

exports.createPartida = async (req, res) => {
    const { idTimeA, idTimeB, qtdeSets, rodada } = req.body
    let timeA,timeB
    //Validações
    if(!idTimeA){
        return res.status(400).json({error : `O campo 'idTimeA' é obrigatorio.`})
    }
    if(!idTimeB){
        return res.status(400).json({error : `O campo 'idTimeB' é obrigatorio.`})
    }
    if(!qtdeSets){
        return res.status(400).json({error : `O campo 'qtdeSets' é obrigatorio.`})
    }
    if(!rodada){
        return res.status(400).json({error : `O campo 'rodada' é obrigatorio.`})
    }
    try {
        // Verifica se o times são diferentes
        if(idTimeA != idTimeB){
            // Se os times são diferentes Verifique se os times existem
            timeA = await Time.findByPk(idTimeA)
            if (!timeA) {
                return res.status(404).json({ error: "Time A não encontrado." })
            }
            timeB = await Time.findByPk(idTimeB)
            if (!timeB) {
                return res.status(404).json({ error: "Time B não encontrado." })
            }
        }else{
            return res.status(401).json({ error: 'Times devem ser diferentes.' })
        }
        // Verifique se a rodada já existe
        const Vrodada = await Partida.findOne({ where: { rodada } })
        if (Vrodada) {
            return res.status(400).json({ error: "Rodada já cadastrada." })
        }
        // Verifique se a partida já existe
        const partida = await Partida.findOne({ where: { idTime1 : idTimeA, idTime2 : idTimeB, rodada } })
        if (partida) {
            return res.status(400).json({ error: "Partida já cadastrada." })
        }
        // Cria a partida
        const newPartida = await Partida.create({
            idTime1 : idTimeA, idTime2 : idTimeB, qtdeSets, rodada 
        })
        const PartidaResponse = {
            id : newPartida.id,
            idTimeA : newPartida.idTime1,
            nomeTimeA : timeA.nomeTime,
            idTimeB : newPartida.idTime2,
            nomeTimeB : timeB.nomeTime,
            qtdeSets : newPartida.qtdeSets,
            rodada : newPartida.rodada,
            createdAt : newPartida.createdAt,
            updatedAt : newPartida.updatedAt
        }
        res.status(201).json(PartidaResponse)
    } catch (error) {
        console.error("Erro ao criar partida:", error)
        res.status(500).json({ error: "Erro interno do servidor." })
    }
}
exports.getPartidas = async (req, res) => {
    try {
        const partidas = await Partida.findAll({
            include : [
                {model : Time, as : 'Time1', attributes : ['nomeTime']},
                {model : Time, as : 'Time2', attributes : ['nomeTime']}
            ]
        })
        if(partidas){
            // Map para mudar nome dos times no retorno
            const partidasResponse = partidas.map((partida) => {
                return {
                    idPartida : partida.idPartida,
                    qtdeSets : partida.qtdeSets,
                    rodada : partida.rodada,
                    idTimeA : partida.idTime1,
                    nomeTimeA : partida.Time1.nomeTime,//Apenas nome para ñ criar um OBJ no JSON
                    idTimeB : partida.idTime2,
                    nomeTimeB : partida.Time2.nomeTime,//Apenas nome para ñ criar um OBJ no JSON
                    createdAt : partida.createdAt,
                    updatedAt : partida.updatedAt
                }
            })
            
            return res.status(200).json(partidasResponse)
        }else{
            return res.status(404).json({error : 'Nenhuma partida encontrada.'})
        }
    } catch (error) {
        console.error("Erro ao buscar partidas:", error)
        return res.status(500).json({ error: "Erro interno do servidor." })
    }
}
exports.deletePartidas = async (req, res) => {
    const {idPartida} = req.params
    // Validações
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    try {
        const verify = await Partida.findByPk(idPartida)
        if(!verify){
            return res.status(401).json({error:`Partida não encontrada.`})
        }
        const deleted = Partida.destroy({where : {idPartida}})
        if(deleted){
            return res.status(200).json({message : 'Partida deletada com sucesso.'})
        }else {
            return res.status(404).json({error : `Partida não encontrada.`})
        }
    } catch (error) {
        console.error("Erro ao remover partida:", error)
        res.status(500).json({ error: "Erro interno do servidor." })
    }
}