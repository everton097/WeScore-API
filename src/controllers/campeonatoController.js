const { Op } = require("sequelize");
const Campeonato = require("../models/campeonato");
const Usuario = require("../models/usuario");
const Partida = require("../models/partida");
const Time = require("../models/time");
const Time_Campeonato = require("../models/time_campeonato");
const path = require("path");
const fs = require("fs");

exports.createCampeonato = async (req, res) => {
	try {
		const { nomeCampeonato, idUsuario } = req.body;
		const logoCampeonato = req.file.filename;
		//Validações
		if (!nomeCampeonato) {
			return res.status(400).json({ error: `O campo 'nome' é obrigatorio.` });
		}
		if (!idUsuario) {
			return res
				.status(400)
				.json({ error: `O campo 'idUsuario' é obrigatorio.` });
		}
		//Verifica se o campeonato já existe
		const campeonatoExists = await Campeonato.findOne({
			where: { nomeCampeonato: { [Op.like]: `${nomeCampeonato}` } },
		});
		if (campeonatoExists) {
			return res.status(422).json({ message: `Campeonato já existe.` });
		}
		//Verifica se o usuario existe
		const usuarioExists = await Usuario.findOne({
			where: { idUsuario: { [Op.like]: idUsuario } },
		});
		if (!usuarioExists) {
			return res.status(404).json({ message: `Usuario não existe.` });
		}
		//Cria o campeonato
		const campeonato = await Campeonato.create({
			nomeCampeonato,
			logoCampeonato,
			idUsuario,
		});
		res.status(200).json({campeonato});
	} catch (error) {
		console.log(
			"nome:" +
				req.body.nomeCampeonato +
				"id: " +
				req.body.idUsuario +
				"logo: " +
				req.body.logoCampeonato +
				"Filenema: " +
				req.file.filename
		);
		console.log(error);
		res.status(500).json({ error: `Erro ao criar campeonato.` });
	}
};
exports.getAllCampeonato = async (req, res) => {
	try {
		const campeonato = await Campeonato.findAll({
			include: [{ model: Usuario, attributes: ["nomeUsuario"] }],
		});
		if (campeonato) {
			res.json(campeonato);
		} else {
			res.status(404).json({ error: "Nenhum campeonato encontrado." });
		}
	} catch (error) {
		console.error("Erro ao buscar campeonato:", error);
		res.status(500).json({ error: "Erro interno do servidor." });
	}
};
exports.getAllCampeonatoUsuario = async (req, res) => {
	try {
		const campeonato = await Campeonato.findAll({
			include: [{ model: Usuario, attributes: ["nomeUsuario"] }],
			where: { idUsuario: req.params.idUsuario },
		});
		if (campeonato) {
			res.json(campeonato);
		} else {
			res.status(404).json({ error: "Nenhum campeonato encontrado." });
		}
	} catch (error) {
		console.error("Erro ao buscar campeonato:", error);
		res.status(500).json({ error: "Erro interno do servidor." });
	}
};
exports.getCampeonatoByID = async (req, res) => {
	try {
		const { idCampeonato } = req.params;
		if (!idCampeonato) {
			return res
				.status(400)
				.json({ error: `O campo 'idCampeonato' é obrigatorio.` });
		}
		const campeonato = await Campeonato.findByPk(idCampeonato, {
			include: [{ model: Usuario, attributes: ["nomeUsuario"] }],
		});
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." });
		}
		res.status(200).json({campeonato});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: `Erro ao buscar o campeonato.` });
	}
};
exports.getCampeonatoByNome = async (req, res) => {
	try {
		const { nomeCampeonato } = req.body;
		if (!nomeCampeonato) {
			return res
				.status(400)
				.json({ error: `O campo 'nomeCampeonato' é obrigatorio.` });
		}
		const campeonato = await Campeonato.findOne({
			include: [{ model: Usuario, attributes: ["nomeUsuario"] }],
			where: { nomeCampeonato: { [Op.like]: `%${nomeCampeonato}%` } },
		});
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." });
		}
		res.status(200).json({campeonato});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: `Erro ao buscar o campeonato.` });
	}
};
exports.updateCampeonatoByID = async (req, res) => {
	try {
		const { idCampeonato } = req.params;
		const { nomeCampeonato, idUsuario, status } = req.body;
		const logoCampeonato = req.file.filename;
		if (!idCampeonato) {
			return res
				.status(400)
				.json({ error: `O campo 'idCampeonato' é obrigatorio.` });
		}
		const update = await Campeonato.findByPk(idCampeonato);
		if (!update) {
			return res.status(404).json({ error: "Campeonato não encontrado." });
		}
		//Verifica se o campeonato já existe
		const campeonatoExists = await Campeonato.findOne({
			where: { nomeCampeonato: { [Op.like]: `%${nomeCampeonato}%` } },
		});
		if (campeonatoExists) {
			return res.status(422).json({ message: `Campeonato já existe.` });
		} else {
			update.nomeCampeonato = nomeCampeonato;
		}
		if ((status === "Aguardando" || status === "Em Andamento" || status === "Finalizado") && update.status !== status) {
			update.status = status;
		}		
		//Verifica se o usuario existe
		const usuarioExists = await Usuario.findOne({
			where: { idUsuario: { [Op.like]: idUsuario } },
		});
		if (!usuarioExists) {
			return res.status(404).json({ message: `Usuario não existe.` });
		} else {
			update.idUsuario = idUsuario;
		}
		if (logoCampeonato) {
			const diretorio = path.join(
				"./public/upload/img/campeonato/" + update.logoCampeonato
			);
			fs.unlinkSync(diretorio, (err) => {
				if (err) {
					return console.error(err);
				}
			});
			update.logoCampeonato = logoCampeonato;
		}
		//Atualiza o campeonato
		await update.save();
		res.status(200).json({update});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: `Erro ao atualizar o campeonato.` });
	}
};
exports.deleteCampeonatoByID = async (req, res) => {
	try {
		const { idCampeonato } = req.params;
		if (!idCampeonato) {
			return res
				.status(400)
				.json({ error: `O campo 'idCampeonato' é obrigatorio.` });
		}
		const campeonato = await Campeonato.findByPk(idCampeonato);
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." });
		}

		//Delete a logo do campeonato
		const diretorio = path.join(
			"./public/upload/img/campeonato/" + campeonato.logoCampeonato
		);
		fs.unlinkSync(diretorio, (err) => {
			if (err) {
				return console.error(err);
			}
		});
		//Deleta o campeonato
		await campeonato.destroy();
		res.status(200).json({
			message: `Time excluído com sucesso.`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: `Erro ao deletar o campeonato.` });
	}
};
exports.getCampeonatosByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        // Converte a string de status separada por vírgulas em um array
        const statusList = status.split(',');

        // Consulta os campeonatos com base nos status fornecidos
        const campeonatos = await Campeonato.findAll({
            where: {
                status: statusList,
            },
            attributes: ['idCampeonato', 'nomeCampeonato', 'status','logoCampeonato'],
        });

        return res.status(200).json(campeonatos);
    } catch (error) {
        console.error('Erro ao obter campeonatos por status:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateCampeonatoStatus = async (req, res) => {
	const { idCampeonato } = req.params;

	try {
		const campeonato = await Campeonato.findByPk(idCampeonato);

		if (!campeonato) {
			console.log("Campeonato não encontrado!");
			return res.status(404).json({ error: 'Campeonato não encontrado!' });
		}
		if(campeonato.status==="Aguardando"){
			campeonato.status = 'Em Andamento';
			await campeonato.save();
	
			return res.status(200).json({ message: 'Status do campeonato atualizado com sucesso' });
		}else{
			return res.status(404).json({ error: 'Campeonato não tem status de Aguardando!' });
		}
	} catch (error) {
		console.error('Erro ao atualizar status do campeonato:', error);
		return res.status(500).json({ error: 'Erro interno do servidor' });
	}
};