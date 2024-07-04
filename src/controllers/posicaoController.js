// controllers/bannerController.js
const Posicao = require('../models/posicao');
const { Op } = require('sequelize');

// Método para criar 12 novos registros para cada ponto da partida de volei
exports.createPosicao = async (req, res) => {
  try {
    const { idPartida, idPonto, jogadores, ladoQuadra } = req.body;
    const posicoes = [
      { posicao: 'Levantador' },
      { posicao: 'Oposto' },
      { posicao: 'Ponteiro' },
      { posicao: 'Central' },
      { posicao: 'Líbero' },
      { posicao: 'Levantador' },
      { posicao: 'Oposto' },
      { posicao: 'Ponteiro' },
      { posicao: 'Central' },
      { posicao: 'Líbero' },
      { posicao: 'Ponteiro' },
      { posicao: 'Central' },
    ];
    const posicao = await Posicao.bulkCreate(posicoes);
    res.status(200).json(posicao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar as posições de vôlei' });
  }
};





// Método para listar todos os banners


// Método para buscar um banner por ID





// Método para excluir um banner por ID
exports.deleteBanner = async (req, res) => {
  const { idBanner } = req.params;
  try {
    const deleted = await Banner.destroy({
      where: { idBanner },
    });
    if (deleted) {
      res.status(200).json({message : 'Banner excluído com sucesso'});
    } else {
      res.status(404).json({ error: 'Banner não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o banner' });
  }
};

