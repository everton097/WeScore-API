const { Op } = require('sequelize')
// Importe o modelo de campeonato e de time
const Time_Campeonato = require('../models/time_campeonato');
const Campeonato = require('../models/campeonato');
const Time = require('../models/time');
const Usuario = require('../models/usuario')

// Função que retorna os campeonatos existentes
exports.getAllCampeonato = async (req,res) => {
    try {
        // Busque todos os campeonatos
        const campeonatos = await Campeonato.findAll({ include : [
            {model: Usuario, attributes: ['nomeUsuario']},
            {model: Time, attributes: ['idTime','nomeTime'],
            through: {attributes: []}//remover "Time_Campeonato": {} da resposta de json, são dados repetidos sem necessidade de retorno.
            }
        ]});
        // Retorne uma resposta com os campeonatos encontrados
        return res.status(200).json(campeonatos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar campeonatos' });
    }
}

// Função que vincula os times ao campeonato
exports.linkTimesCampeonato = async (req,res) => {
    try {
        const { idCampeonato, idTimes } = req.body;
        // Verifique se o campeonato existe
        const campeonato = await Campeonato.findByPk(idCampeonato);
        if (!campeonato) {
            return res.status(404).json({ error: 'Campeonato não encontrado.' });
        }
        // Verifique se os times existem
        let times = [];//Array para armazenas os times buscados
        if (Array.isArray(idTimes)) {
            // Se for uma matriz, consulta todos os times
            times = await Time.findAll({
                where: { idTime: { [Op.in]: idTimes }}
            });
        } else {
            // Se for um único ID, consulta apenas esse time
            const time = await Time.findByPk(idTimes);
            if (!time) {
                return res.status(400).json({ error: 'Time não encontrado.' });
            }
            times = [time];
        }
        // Associa os times ao campeonato
        await campeonato.addTimes(times);
    
        res.status(200).json({ message: 'Times associados ao campeonato com sucesso.' });
    } catch (error) {
        console.error('Erro ao associar times ao campeonato:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
//delete time do campeonato
exports.deleteTimeCampeonato = async (req,res) => {
    try {
        const { idCampeonato, idTime } = req.body;
        // Verifique se o campeonato existe
        const campeonato = await Campeonato.findByPk(idCampeonato);
        if (!campeonato) {
            return res.status(404).json({ error: 'Campeonato não encontrado.' });
        }
        // Verifique se os times existem
        const time = await Time.findByPk(idTime);
        if (!time) {
            return res.status(400).json({ error: 'Time não encontrado.' });
        }
        // Desassocia os times ao campeonato
        await campeonato.removeTime(time);
    
        res.status(200).json({ message: 'Time desassociado ao campeonato com sucesso.' });
    } catch (error) {
        console.error('Erro ao desassociar time ao campeonato:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}