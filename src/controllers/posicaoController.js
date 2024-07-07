// controllers/bannerController.js
const Posicao = require('../models/posicao');
const { Op } = require('sequelize');

// Método para criar 12 novos registros para cada ponto da partida de volei
exports.createPosicao = async (req, res) => {
  try {
    const { idPartida, idPonto, jogadoresEmQuadraDireita, jogadoresEmQuadraEsquerda } = req.body;
    // Validações
    if (!idPartida || !idPonto || !jogadoresEmQuadraDireita || !jogadoresEmQuadraEsquerda) {
      return res.status(400).json({ error: 'Dados insuficientes para criar as posições de vôlei' });
    }
    const posicoes = [
      { idPonto, idJogador: jogadoresEmQuadraDireita[0],  ladoQuadra:'Direita',  idPartida,  local: '0' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[1],  ladoQuadra:'Direita',  idPartida,  local: '1' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[2],  ladoQuadra:'Direita',  idPartida,  local: '2' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[3],  ladoQuadra:'Direita',  idPartida,  local: '3' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[4],  ladoQuadra:'Direita',  idPartida,  local: '4' },
      { idPonto, idJogador: jogadoresEmQuadraDireita[5],  ladoQuadra:'Direita',  idPartida,  local: '5' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[0], ladoQuadra:'Esquerda', idPartida,  local: '0' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[1], ladoQuadra:'Esquerda', idPartida,  local: '1' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[2], ladoQuadra:'Esquerda', idPartida,  local: '2' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[3], ladoQuadra:'Esquerda', idPartida,  local: '3' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[4], ladoQuadra:'Esquerda', idPartida,  local: '4' },
      { idPonto, idJogador: jogadoresEmQuadraEsquerda[5], ladoQuadra:'Esquerda', idPartida,  local: '5' },
    ];

    // Adicionar as posições dos líberos se houverem 7 jogadores em cada lado
    if (jogadoresEmQuadraDireita.length === 7) {
      posicoes.push({ idPonto, idJogador: jogadoresEmQuadraDireita[6], ladoQuadra: 'Direita', idPartida, local: '6' });
    }

    if (jogadoresEmQuadraEsquerda.length === 7) {
      posicoes.push({ idPonto, idJogador: jogadoresEmQuadraEsquerda[6], ladoQuadra: 'Esquerda', idPartida, local: '6' });
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
  const { idPonto } = req.body
  try {
    const posicoes = await Posicao.findAll({
      order: [['idPosicao', 'DESC']],
      include: ['jogador'],
      where: { idPonto },
    });
    res.status(200).json(posicoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as posições de vôlei' });
  }
};
