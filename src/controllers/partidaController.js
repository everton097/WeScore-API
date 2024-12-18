const { Op } = require("sequelize"); //para utilizar like
const Partida = require("../models/partida");
const Time = require("../models/time");
const Campeonato = require("../models/campeonato");
const Set = require("../models/set")
const pontoController = require("../controllers/pontosController");

exports.createPartida = async (req, res) => {
	const { idTime1, idTime2, qtdeSets, idCampeonato } = req.body;
	let timeA, timeB;
	//Validações
	if (!idTime1) {
		return res.status(400).json({ error: `O campo 'idTime1' é obrigatorio.` });
	}
	if (!idTime2) {
		return res.status(400).json({ error: `O campo 'idTime2' é obrigatorio.` });
	}
	if (!qtdeSets) {
		return res.status(400).json({ error: `O campo 'qtdeSets' é obrigatorio.` });
	}
	try {
		// Verifica se o times são diferentes
		if (idTime1 != idTime2) {
			// Se os times são diferentes Verifique se os times existem
			timeA = await Time.findByPk(idTime1);
			if (!timeA) {
				return res.status(404).json({ error: "Time A não encontrado." });
			}
			timeB = await Time.findByPk(idTime2);
			if (!timeB) {
				return res.status(404).json({ error: "Time B não encontrado." });
			}
		} else {
			return res.status(401).json({ error: "Times devem ser diferentes." });
		}
		// Verifica se o campeonato existe
		const campeonato = await Campeonato.findByPk(idCampeonato);
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." });
		}
		// Verifique se a proxima rodada
		const NUNrodada = await Partida.count({ where: { idCampeonato } });
		rodada = NUNrodada + 1;
		// Verifique se a partida já existe
		const partida = await Partida.findOne({
			where: {
				[Op.or]: [
					{ idTime1, idTime2, qtdeSets, idCampeonato },
					{ idTime1: idTime2, idTime2: idTime1, qtdeSets, idCampeonato },
				],
			},
		});
		if (partida) {
			return res.status(400).json({ error: "Partida já cadastrada." });
		}
		// Cria a partida
		const newPartida = await Partida.create({
			idTime1: idTime1,
			idTime2: idTime2,
			qtdeSets,
			rodada,
			idCampeonato,
		});
		const PartidaResponse = {
			id: newPartida.id,
			idTime1: newPartida.idTime1,
			nomeTimeA: timeA.nomeTime,
			idTime2: newPartida.idTime2,
			nomeTimeB: timeB.nomeTime,
			qtdeSets: newPartida.qtdeSets,
			rodada: newPartida.rodada,
			idcampeonato: newPartida.idCampeonato,
			createdAt: newPartida.createdAt,
			updatedAt: newPartida.updatedAt,
		};
		res.status(201).json(PartidaResponse);
	} catch (error) {
		console.error("Erro ao criar partida:", error);
		res.status(500).json({ error: "Erro interno do servidor." });
	}
};
exports.getPartidas = async (req, res) => {
	try {
		const partidas = await Partida.findAll({
			include: [
				{ model: Time, as: "Time1", attributes: ["nomeTime"] },
				{ model: Time, as: "Time2", attributes: ["nomeTime"] },
			],
		});
		if (partidas) {
			// Map para mudar nome dos times no retorno
			const partidasResponse = partidas.map((partida) => {
				return {
					idPartida: partida.idPartida,
					qtdeSets: partida.qtdeSets,
					rodada: partida.rodada,
					status: partida.status,
					idTime1: partida.idTime1,
					nomeTime1: partida.Time1.nomeTime, //Apenas nome para ñ criar um OBJ no JSON
					idTime2: partida.idTime2,
					nomeTime2: partida.Time2.nomeTime, //Apenas nome para ñ criar um OBJ no JSON
					createdAt: partida.createdAt,
					updatedAt: partida.updatedAt,
				};
			});

			return res.status(200).json(partidasResponse);
		} else {
			return res.status(404).json({ error: "Nenhuma partida encontrada." });
		}
	} catch (error) {
		console.error("Erro ao buscar partidas:", error);
		return res.status(500).json({ error: "Erro interno do servidor." });
	}
};
exports.getPartidasByCamp = async (req, res) => {
	const idCampeonato = req.params.idCampeonato;
	try {
		const partidas = await Partida.findAll({
			include: [
				{ model: Time, as: "Time1", attributes: ["nomeTime"] },
				{ model: Time, as: "Time2", attributes: ["nomeTime"] },
				{
					model: Campeonato,
					as: "campeonato_partida",
					where: { idCampeonato: idCampeonato },
				},
			],
		});
		// Map para mudar nome dos times no retorno
		const partidasResponse = partidas.map((partida) => {
			return {
				idPartida: partida.idPartida,
				rodada: partida.rodada,
				status: partida.status,
				qtdeSets: partida.qtdeSets,
				idTime1: partida.idTime1,
				nomeTime1: partida.Time1.nomeTime, //Apenas nome para ñ criar um OBJ no JSON
				idTime2: partida.idTime2,
				nomeTime2: partida.Time2.nomeTime, //Apenas nome para ñ criar um OBJ no JSON
				idCampeonato: partida.idCampeonato,
				nomeCampeonato: partida.campeonato_partida.nomeCampeonato,
				logoCampeonato: partida.campeonato_partida.logoCampeonato,
				createdAt: partida.createdAt,
				updatedAt: partida.updatedAt,
			};
		});
		return res.status(200).json(partidasResponse);
	} catch (error) {
		console.error("Erro ao obter partidas do campeonato:", error);
	}
};
exports.getIDPartidasByCamp = async (req, res) => {
	const idCampeonato = req.params.idCampeonato;
	try {
		const partidas = await Partida.findAll({
			include: [
				{ model: Time, as: "Time1", attributes: ["nomeTime"] },
				{ model: Time, as: "Time2", attributes: ["nomeTime"] },
				{
					model: Campeonato,
					as: "campeonato_partida",
					where: { idCampeonato: idCampeonato },
				},
			],
		});
		// Verifica se há mais de uma partida e unifica os  em um unico array, removendo duplicatas usando o Set, operador spread (...) para converter o Set de volta em um array.
		const unifiedResponse =
			partidas.length > 1
				? {
					idtime: [
						...new Set(
							partidas.flatMap((partida) => [
								partida.idTime1,
								partida.idTime2,
							])
						),
					],
				}
				: {
					idtime: partidas.flatMap((partida) => [
						partida.idTime1,
						partida.idTime2,
					]),
				};
		return res.status(200).json(unifiedResponse);
	} catch (error) {
		console.error("Erro ao obter partidas do campeonato:", error);
	}
};
exports.deletePartidas = async (req, res) => {
	const { idPartida } = req.params;
	// Validações
	if (!idPartida) {
		return res
			.status(400)
			.json({ error: `O campo 'idPartida' é obrigatorio.` });
	}
	try {
		const verify = await Partida.findByPk(idPartida);
		if (!verify) {
			return res.status(401).json({ error: `Partida não encontrada.` });
		} else if (verify.status !== "Aguardando") {
			return res
				.status(401)
				.json({
					error:
						"Partida não pode ser removida, pois já foi INICIADA ou FINALIZADA.",
				});
		}
		const deleted = Partida.destroy({ where: { idPartida } });
		if (deleted) {
			return res.status(200).json({ message: "Partida deletada com sucesso." });
		} else {
			return res.status(404).json({ error: `Partida não encontrada.` });
		}
	} catch (error) {
		console.error("Erro ao remover partida:", error);
		res.status(500).json({ error: "Erro interno do servidor." });
	}
};
exports.getPartidaByStatus = async (req, res) => {
	const { status } = req.params;

	try {
		// Converte a string de status separada por vírgulas em um array
		const statusList = status.split(",");

		// Consulta os campeonatos com base nos status fornecidos
		const partidas = await Campeonato.findAll({
			where: {
				status: statusList,
			},
		});

		return res.status(200).json(partidas);
	} catch (error) {
		console.error("Erro ao obter campeonatos por status:", error);
		return res.status(500).json({ error: "Erro interno do servidor" });
	}
};
exports.updatePartidaStatus = async (req, res) => {
	const { idPartida } = req.params;

	try {
		const partida = await Partida.findByPk(idPartida);
		if (!partida) {
			console.log("Partida não encontrado!");
			return res.status(404).json({ error: "Partida não encontrado!" });
		}
		if (partida.status === "Aguardando") {
			// Verifica se o campeonato esta iniciado, se não estiver inicia antes da partida.
			const partidaComp = await Campeonato.findByPk(partida.idCampeonato);
			if (partidaComp.status === "Aguardando") {
				partidaComp.status = "Em Andamento";
				await partidaComp.save();
			}
			// Chama o método createPonto
			await pontoController.createPontoInterno({ idPartida: idPartida });
			partida.status = "Em Andamento";
			await partida.save();

			return res
				.status(200)
				.json({ message: "Status do partida atualizado com sucesso." });
		} else {
			return res
				.status(404)
				.json({ error: "Partida não tem status de Aguardando!" });
		}
	} catch (error) {
		console.error("Erro ao atualizar status do campeonato:", error);
		return res.status(500).json({ error: "Erro interno do servidor" });
	}
};
exports.updatePartidaByID = async (req, res) => {
	const { idPartida } = req.params;
	const { idTime1, idTime2, qtdeSets, idCampeonato } = req.body;
	let timeA, timeB;
	//Validações
	if (!idTime1) {
		return res.status(400).json({ error: `O campo 'idTime1' é obrigatorio.` });
	}
	if (!idTime2) {
		return res.status(400).json({ error: `O campo 'idTime2' é obrigatorio.` });
	}
	if (!qtdeSets) {
		return res.status(400).json({ error: `O campo 'qtdeSets' é obrigatorio.` });
	}
	try {
		// Verifica se o times são diferentes
		if (idTime1 != idTime2) {
			// Se os times são diferentes Verifique se os times existem
			timeA = await Time.findByPk(idTime1);
			if (!timeA) {
				return res.status(404).json({ error: "Time A não encontrado." });
			}
			timeB = await Time.findByPk(idTime2);
			if (!timeB) {
				return res.status(404).json({ error: "Time B não encontrado." });
			}
		} else {
			return res.status(401).json({ error: "Times devem ser diferentes." });
		}
		// Verifica se o campeonato existe
		const campeonato = await Campeonato.findByPk(idCampeonato);
		if (!campeonato) {
			return res.status(404).json({ error: "Campeonato não encontrado." });
		}

		// Verifique se a partida já existe
		const partidaExists = await Partida.findOne({
			where: {
				[Op.or]: [
					{ idTime1, idTime2, qtdeSets, idCampeonato },
					{ idTime1: idTime2, idTime2: idTime1, qtdeSets, idCampeonato },
				],
			},
		});
		if (partidaExists) {
			return res.status(400).json({ error: "Partida já cadastrada." });
		}
		//Verifica se partida a editar existe
		const update = await Partida.findByPk(idPartida, {
			include: [
				{ model: Time, as: "Time1", attributes: ["nomeTime"] },
				{ model: Time, as: "Time2", attributes: ["nomeTime"] },
			],
		});
		if (!update) {
			return res.status(404).json({ error: "Partida não encontrado." });
		} else if (update.status !== "Aguardando") {
			return res
				.status(401)
				.json({
					error:
						"Partida não pode ser editada, pois já foi INICIADA ou FINALIZADA.",
				});
		} else {
			// Atualiza a partida
			await Partida.update(
				{
					idTime1: idTime1,
					idTime2: idTime2,
					qtdeSets,
					idCampeonato,
				},
				{ where: { idPartida } }
			);
			const PartidaResponse = {
				idPartida: update.idPartida,
				qtdeSets: update.qtdeSets,
				rodada: update.rodada,
				status: update.status,
				idTime1: update.idTime1,
				nomeTime1: update.Time1.nomeTime, //Apenas nome para ñ criar um OBJ no JSON
				idTime2: update.idTime2,
				nomeTime2: update.Time2.nomeTime, //Apenas nome para ñ criar um OBJ no JSON
				createdAt: update.createdAt,
				updatedAt: update.updatedAt,
			};
			res.status(201).json(PartidaResponse);
		}
	} catch (error) {
		console.error("Erro ao criar partida:", error);
		res.status(500).json({ error: "Erro interno do servidor." });
	}
};
// Buscar partidas por idpartide e idcampeonato
exports.getPartidaById = async (req, res) => {
	const { idPartida } = req.params;
	// validaçoes
	if (!idPartida) {
		return res
			.status(400)
			.json({ error: `O campo 'idPartida' é obrigatorio.` });
	}
	try {
		console.log("debug, entrou no metodo certo!");
		const partida = await Partida.findByPk(idPartida, {
			include: [
				{ model: Time, as: "Time1" },
				{ model: Time, as: "Time2" },
				{ model: Campeonato, as: "campeonato_partida" },
				{ model: Set, as: "sets", limit: 1, order: [['createdAt', 'DESC']]}
			],
			where: {
				idPartida: idPartida,
			},
		});
		if (partida) {
			// Map para mudar nome dos times no retorno
			const PartidaDataResponse = {
				idPartida: partida.idPartida,
				rodada: partida.rodada,
				qtdeSets: partida.qtdeSets,
				setAtual: partida.sets[0].numeroSet,
				status: partida.status,
				idTime1: partida.idTime1,
				nomeTime1: partida.Time1.nomeTime,
				logoTime1: partida.Time1.logoTime,
				idTime2: partida.idTime2,
				nomeTime2: partida.Time2.nomeTime,
				logoTime2: partida.Time2.logoTime,
				idCampeonato: partida.idCampeonato,
				nomeCampeonato: partida.campeonato_partida.nomeCampeonato,
				logoCampeonato: partida.campeonato_partida.logoCampeonato,
				statusCampeonato: partida.campeonato_partida.status,
				createdAt: partida.createdAt,
				updatedAt: partida.updatedAt,
			};
			return res.status(200).json(PartidaDataResponse);
		} else {
			return res.status(404).json({ error: "Partida não encontrada." });
		}
	} catch (error) {
		console.error("Erro ao buscar partida:", error);
		return res.status(500).json({ error: "Erro interno do servidor." });
	}
};
