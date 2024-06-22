const { Op } = require("sequelize"); //para utilizar like
const Time = require("../models/time");
const Jogador = require("../models/jogador");

exports.createJogador = async (req, res) => {
  try {
    const { nomeJogador, sobrenome, cpf, telefone, numeroCamiseta, idTime } =
      req.body;
    //Validações
    if (!nomeJogador) {
      return res.status(400).json({ error: `O campo 'nome' é obrigatorio.` });
    }
    if (!sobrenome) {
      return res
        .status(400)
        .json({ error: `O campo 'sobrenome' é obrigatorio.` });
    }
    if (!cpf) {
      return res.status(400).json({ error: `O campo 'cpf' é obrigatorio.` });
    }
    if (!telefone) {
      return res
        .status(400)
        .json({ error: `O campo 'telefone' é obrigatorio.` });
    }
    if (!numeroCamiseta) {
      return res
        .status(400)
        .json({ error: `O campo 'numeroCamiseta' é obrigatorio.` });
    }
    if (!idTime) {
      return res.status(400).json({ error: `O campo 'idTime' é obrigatorio.` });
    }
    //Verifica se o jogador já existe
    const jogadorExists = await Jogador.findOne({
      where: { cpf: { [Op.like]: cpf } },
    });
    if (jogadorExists) {
      return res
        .status(422)
        .json({ message: `CPF do jogador já vinculado a cadastro existente.` });
    }
    //Verifica se o time existe
    const timeExists = await Time.findOne({
      where: { idTime: idTime },
    });
    if (!timeExists) {
      return res.status(404).json({ message: `Time não existe.` });
    }
    const jogador = await Jogador.create({
      idTime,
      nomeJogador,
      sobrenome,
      cpf,
      telefone,
      numeroCamiseta,
    });
    const retorno = await Jogador.findOne({
      where: { cpf: { [Op.like]: cpf } },
      include: [{ model: Time, attributes: ["nomeTime"] }],
    });
    res.status(200).json({
      status: "success",
      data: retorno,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Erro ao criar jogador.` });
  }
};
exports.getAllJogador = async (req, res) => {
  try {
    const jogador = await Jogador.findAll({
      include: [{ model: Time, attributes: ["nomeTime"] }],
    });

    if (jogador) {
      res.json(jogador);
    } else {
      res.status(404).json({ error: "Nenhum time encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar Jogadors:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
exports.getJogadorByID = async (req, res) => {
  try {
    const { idJogador } = req.params;
    const jogador = await Jogador.findOne({
      where: { idJogador },
      include: [{ model: Time, attributes: ["nomeTime"] }],
    });
    if (jogador) {
      res.status(200).json(jogador);
    } else {
      res.status(404).json({ error: `Jogador não encontrado.` });
    }
  } catch (error) {
    console.error(`Erro ao buscar jogador ${error}`);
    res.status(500).json({ error: `Erro ao buscar jogador` });
  }
};
exports.updateJogador = async (req, res) => {
  try {
    const { idJogador } = req.params;
    const { nomeJogador, sobrenome, cpf, telefone, numeroCamiseta, idTime } =
      req.body;

    const updateJogador = await Jogador.findByPk(idJogador);
    if (!updateJogador) {
      return res.status(404).json({ error: `Jogador não encontrado.` });
    }
    if (!nomeJogador) {
      return res
        .status(400)
        .json({ error: `O campo 'nomeJogador' é obrigatorio.` });
    } else {
      updateJogador.nomeJogador = nomeJogador;
    }
    if (!sobrenome) {
      return res
        .status(400)
        .json({ error: `O campo 'sobrenome' é obrigatorio.` });
    } else {
      updateJogador.sobrenome = sobrenome;
    }
    if (!telefone) {
      return res
        .status(400)
        .json({ error: `O campo 'telefone' é obrigatorio.` });
    } else {
      updateJogador.telefone = telefone;
    }
    if (!numeroCamiseta) {
      return res
        .status(400)
        .json({ error: `O campo 'numeroCamiseta' é obrigatorio.` });
    } else {
      updateJogador.numeroCamiseta = numeroCamiseta;
    }
    if (!idTime) {
      return res.status(400).json({ error: `O campo 'idTime' é obrigatorio.` });
    } else {
      updateJogador.idTime = idTime;
    }

    await updateJogador.save();
    res.status(200).json(updateJogador);
  } catch (error) {
    console.error("Erro ao atualizar jogador:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
exports.deleteJogador = async (req, res) => {
  const { idJogador } = req.params;
  try {
    if (!idJogador) {
      return res
        .status(400)
        .json({ error: `O campo 'idJogador' é obrigatorio.` });
    }
    const deleted = await Jogador.destroy({
      where: { idJogador },
    });
    if (deleted) {
      res.status(200).json({ message: `Jogador excluído com sucesso.` });
    } else {
      res.status(404).json({ error: `Jogador não encontrado.` });
    }
  } catch (error) {
    console.error(`Erro ao deletar ${error}`);
    res.status(500).json({ error: `Erro ao excluir o jogador` });
  }
};

exports.disenrollJogador = async (req, res) => {
    try {
      const { idJogador, idTime } = req.body;
  
      // Verifique se o time existe
      const timeJogador = await Time.findOne({ where: { idTime } });
  
      if (!timeJogador) {
        return res.status(404).json({ error: "Time não encontrado." });
      }
  
      // Verifique se o jogador existe
      const jogador = await Jogador.findOne({
        where: {
          idJogador,
          idTime
        },
      });
  
      if (!jogador) {
        return res.status(404).json({ error: "Jogador não encontrado." });
      }
  
      // Desassociar o time ao jogador (presumindo que você tem uma associação entre Jogador e Time)
      jogador.idTime = null
      await jogador.save();
  
      res.status(200).json({ message: "Time desassociado ao jogador com sucesso." });
    } catch (error) {
      console.error("Erro ao desassociar time ao jogador:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  };  