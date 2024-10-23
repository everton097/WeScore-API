// controllers/bannerController.js
const Posicao = require('../models/posicao');
const { Op } = require('sequelize');
const sequelize = require('../conn/connection');

// Método para criar 12 novos registros para cada ponto da partida de volei
exports.createPosicao = async (req, res) => {
  const { idPartida, idPonto, jogadoresEmQuadraDireita, liberoD, jogadoresEmQuadraEsquerda,liberoE } = req.body;
  // Validações individuais
  if (!idPartida) {
    return res.status(400).json({ error: `O campo 'idPartida' é obrigatorio.` })
  }
  if (!idPonto) {
    return res.status(400).json({ error: `O campo 'idPonto' é obrigatorio.` })
  }
  if (!jogadoresEmQuadraDireita) {
    return res.status(400).json({ error: `O campo 'jogadoresEmQuadraDireita' é obrigatorio.` })
  }
  if (!jogadoresEmQuadraEsquerda) {
    return res.status(400).json({ error: `O campo 'jogadoresEmQuadraEsquerda' é obrigatorio.` })
  }
  if (!liberoD) {
    return res.status(400).json({ error: `O campo 'liberoD' é obrigatorio.` })
  }
  if (!liberoE) {
    return res.status(400).json({ error: `O campo 'liberoE' é obrigatorio.` })
  }
  // Validação de quantidade de jogadores
  if (jogadoresEmQuadraDireita.length < 6) {
    return res.status(400).json({ error: `É necessário 6 jogadores em quadra no lado direito.` })
  }
  if (jogadoresEmQuadraEsquerda.length < 6) {
    return res.status(400).json({ error: `É necessário 6 jogadores em quadra no lado esquerdo.` })
  }
  try {
    // Validações
    if (!idPartida || !idPonto || !jogadoresEmQuadraDireita || !jogadoresEmQuadraEsquerda) {
      return res.status(400).json({ error: 'Dados insuficientes para criar as posições de vôlei' });
    }
    const posicoes = [
      { idPonto, idJogador: jogadoresEmQuadraDireita[0], ladoQuadra: 'Direita', idPartida, local: '0' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[1], ladoQuadra: 'Direita', idPartida, local: '1' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[2], ladoQuadra: 'Direita', idPartida, local: '2' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[3], ladoQuadra: 'Direita', idPartida, local: '3' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[4], ladoQuadra: 'Direita', idPartida, local: '4' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[5], ladoQuadra: 'Direita', idPartida, local: '5' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[0], ladoQuadra: 'Esquerda', idPartida, local: '0' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[1], ladoQuadra: 'Esquerda', idPartida, local: '1' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[2], ladoQuadra: 'Esquerda', idPartida, local: '2' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[3], ladoQuadra: 'Esquerda', idPartida, local: '3' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[4], ladoQuadra: 'Esquerda', idPartida, local: '4' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[5], ladoQuadra: 'Esquerda', idPartida, local: '5' },
    ];

    // Adicionar as posições dos líberos se houverem 7 jogadores em cada lado
    if (jogadoresEmQuadraDireita.length === 7) {
      posicoes.push({ idPonto, idJogador: jogadoresEmQuadraDireita[6], ladoQuadra: 'Direita', idPartida, local: liberoD });
    }

    if (jogadoresEmQuadraEsquerda.length === 7) {
      posicoes.push({ idPonto, idJogador: jogadoresEmQuadraEsquerda[6], ladoQuadra: 'Esquerda', idPartida, local: liberoE });
    }

    const posicao = await Posicao.bulkCreate(posicoes);
    res.status(200).json(posicao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar as posições de vôlei' });
  }
};
exports.plusPosicao = async (req, res) => {
  const { idPartida, idPonto, jogadoresEmQuadraDireita, liberoD, jogadoresEmQuadraEsquerda,liberoE } = req.body;
  // Validações individuais
  if (!idPartida) {
    return res.status(400).json({ error: `O campo 'idPartida' é obrigatorio.` })
  }
  if (!idPonto) {
    return res.status(400).json({ error: `O campo 'idPonto' é obrigatorio.` })
  }
  if (!jogadoresEmQuadraDireita) {
    return res.status(400).json({ error: `O campo 'jogadoresEmQuadraDireita' é obrigatorio.` })
  }
  if (!jogadoresEmQuadraEsquerda) {
    return res.status(400).json({ error: `O campo 'jogadoresEmQuadraEsquerda' é obrigatorio.` })
  }
  if (!liberoD) {
    return res.status(400).json({ error: `O campo 'liberoD' é obrigatorio.` })
  }
  if (!liberoE) {
    return res.status(400).json({ error: `O campo 'liberoE' é obrigatorio.` })
  }
  // Validação de quantidade de jogadores
  if (jogadoresEmQuadraDireita.length < 6) {
    return res.status(400).json({ error: `É necessário 6 jogadores em quadra no lado direito.` })
  }
  if (jogadoresEmQuadraEsquerda.length < 6) {
    return res.status(400).json({ error: `É necessário 6 jogadores em quadra no lado esquerdo.` })
  }
  try {
    // Validações
    if (!idPartida || !idPonto || !jogadoresEmQuadraDireita || !jogadoresEmQuadraEsquerda) {
      return res.status(400).json({ error: 'Dados insuficientes para criar as posições de vôlei' });
    }
    const posicoes = [
      { idPonto, idJogador: jogadoresEmQuadraDireita[0], ladoQuadra: 'Direita', idPartida, local: '5' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[1], ladoQuadra: 'Direita', idPartida, local: '0' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[2], ladoQuadra: 'Direita', idPartida, local: '1' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[3], ladoQuadra: 'Direita', idPartida, local: '2' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[4], ladoQuadra: 'Direita', idPartida, local: '3' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[5], ladoQuadra: 'Direita', idPartida, local: '4' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[0], ladoQuadra: 'Esquerda', idPartida, local: '5' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[1], ladoQuadra: 'Esquerda', idPartida, local: '0' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[2], ladoQuadra: 'Esquerda', idPartida, local: '1' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[3], ladoQuadra: 'Esquerda', idPartida, local: '2' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[4], ladoQuadra: 'Esquerda', idPartida, local: '3' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[5], ladoQuadra: 'Esquerda', idPartida, local: '4' },
    ];

    // Adicionar as posições dos líberos se houverem 7 jogadores em cada lado
    if (jogadoresEmQuadraDireita.length === 7) {
      posicoes.push({ idPonto, idJogador: jogadoresEmQuadraDireita[6], ladoQuadra: 'Direita', idPartida, local: liberoD });
    }

    if (jogadoresEmQuadraEsquerda.length === 7) {
      posicoes.push({ idPonto, idJogador: jogadoresEmQuadraEsquerda[6], ladoQuadra: 'Esquerda', idPartida, local: liberoE });
    }

    const posicao = await Posicao.bulkCreate(posicoes);
    res.status(200).json(posicao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar as posições de vôlei' });
  }
};
// Método para listar todos os jogadores no ultimo ponto da partida de volei
exports.getLastPosicoes = async (req, res) => {
  const { idPonto } = req.params;
  try {
    const posicoes = await Posicao.findAll({
      attributes: [
        'idPosicao',
        'local',
        'ladoQuadra',
        'idPonto',
        'idPartida',
        'idJogador',
      ],
      where: {
        idPonto,
        createdAt: {
          [Op.in]: sequelize.literal(`(
            SELECT MAX(P2.createdAt)
            FROM miseria.posicaos AS P2
            WHERE P2.local = Posicao.local
            AND P2.ladoQuadra = Posicao.ladoQuadra
            GROUP BY P2.local, P2.ladoQuadra
          )`)
        }
      },
      order: [
        ['ladoQuadra', 'ASC'],
        ['local', 'ASC'],
      ],
      include: ['posicaoes_partida'],
    });
    
    res.status(200).json(posicoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as posições de vôlei' });
  }
};