const { Op } = require("sequelize")
// Importe o modelo de campeonato e de time
const Time_Campeonato = require("../models/time_campeonato")
const Campeonato = require("../models/campeonato")
const Time = require("../models/time")
const Usuario = require("../models/usuario")

// Função que retorna os campeonatos existentes
exports.getAllCampeonato = async (req, res) => {
	try {
		// Busque todos os campeonatos
		const campeonatos = await Campeonato.findAll({
			include: [
				{ model: Usuario, attributes: ["nomeUsuario"] },
				{ model: Time,as: "campeonato_time", attributes: ["idTime", "nomeTime"],
				through: { attributes: [] }} //remover "Time_Campeonato": {} da resposta de json, são dados repetidos sem necessidade de retorno.
			]
		})
		// Retorne uma resposta com os campeonatos encontrados
		
		return res.status(200).json(campeonatos)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Erro ao buscar campeonatos" })
	}
}
// Função que retorna os Ids dos times vinculado ao campeonato
exports.getTimesByCampeonato = async (req, res) => {
	try {
		const { idCampeonato } = req.params
		// Verifique se o campeonato existe
		const campeonato = await Campeonato.findByPk(idCampeonato)
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." })
		}
		// Busque todos os times vinculados ao campeonato
		const times = await Time_Campeonato.findAll({ where: { idCampeonato } })
		// Verifica se há mais de uma time e unifica os em um unico array, removendo duplicatas usando o Set, operador spread (...) para converter o Set de volta em um array.
		const unifiedResponse = times.length > 1 
		? { idtime: [...new Set(times.flatMap(time => [time.idTime]))] }
		: { idtime: times.flatMap(time => [time.idTime]) };
		// Retorne uma resposta com os times encontrados
		return res.status(200).json(unifiedResponse)
	} catch (error) {
		console.error("Erro ao buscar times vinculados ao campeonato:", error)
		return res.status(500).json({ error: "Erro interno do servidor." })
	}
}
// Função que vincula os times ao campeonato
exports.enrollTimesCampeonato = async (req, res) => {
	try {
		const { idCampeonato, idTimes } = req.body
		console.log("idTimes: ",idTimes);
		var timeList = [];
		// Verifica se o campeonato existe
		const campeonato = await Campeonato.findByPk(idCampeonato)
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." })
		}
		console.log("Tipo idTimes: ",typeof idTimes);
		// Verifica se o idTimes é uma string ou um array de ids
		if (typeof idTimes === 'string') {
			timeList = idTimes.split(',');			
		} else {
			timeList = idTimes;
		}
		console.log("timeList: ",timeList);
		// Verifica se os times existem
        const times = await Time.findAll({ where : {idTime : timeList} })
		if (times.length == 0) {
			return res.status(400).json({ error: "Time(s) não encontrado(s)!." })
		}
		console.log("times: ",times);
		// Verifica se os times já pertencem ao campeonato
        const timesCamp = await Time_Campeonato.findAll({ where : {idTime : timeList ,idCampeonato:idCampeonato} })
		if (timesCamp.length > 0) {
			return res.status(400).json({ error: "Time(s) já vinculado(s) ao campeonato." })
		}
		// Associa os times ao campeonato
		const testt = await campeonato.addCampeonato_time(times);
		res.status(200).json({ message: "Time(s) associados ao campeonato com sucesso." })
	} catch (error) {
		console.error("Erro ao associar times ao campeonato:", error)
		res.status(500).json({ error: "Erro interno do servidor." })
	}
}
// Delete time do campeonato
exports.deleteTimeCampeonato = async (req, res) => {
	try {
		const { idCampeonato, idTimes } = req.body
		// Verifique se o campeonato existe
		const campeonato = await Campeonato.findByPk(idCampeonato)
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." })
		}
		// Operador ternário para verificar se é um array(matriz) ou não
        const query = Array.isArray(idTimes)
            ? { idTime: { [Op.in]: idTimes } }
            : { idTime: idTimes }
        // Verifique se os times pertencem ao campeonato
        const timesCamp = await Time_Campeonato.findAll({ where: query })
		if (timesCamp.length > 0) {
			// Desassocia os times ao campeonato
            await campeonato.removeTime(timesCamp)
		}else{
            return res.status(400).json({ error: "Time(s) não vinculado(s) ao campeonato." })
        }

		res.status(200).json({ message: "Time(s) desassociado(s) ao campeonato com sucesso." })
	} catch (error) {
		console.error("Erro ao desassociar time ao campeonato:", error)
		res.status(500).json({ error: "Erro interno do servidor." })
	}
}
// Função que deleta o times vinculado ao campeonato
exports.deleteTimesCampeonato = async (req, res) => {
	try {
		const { idCampeonato, idTime } = req.params
		// Verifique se o campeonato existe
		const campeonato = await Campeonato.findByPk(idCampeonato)
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." })
		}
		// Verifique se o time existe
		const time = await Time.findByPk(idTime)
		if (!time) {
			return res.status(404).json({ error: "Time não encontrado." })
		}

		const deleted = await Time_Campeonato.destroy({
			where : { idCampeonato, idTime }
			})
		if(deleted){
			res.status(200).json({message : `Time desassociado ao campeonato com sucesso.`})
		} else {
			res.status(404).json({error : `Time não vinculado ao campeonato!`})
		}
	} catch (error) {
		console.error("Erro ao desassociar time ao campeonato:", error)
		res.status(500).json({ error: "Erro interno do servidor." })
	}
}