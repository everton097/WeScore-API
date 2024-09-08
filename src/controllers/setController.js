const Set = require("../models/set")
exports.createSetInterno = async ({ idPartida }) => {
  try {
      // Verifique se set da partida já existe
      const setPartidaExistente = await Set.findOne({ where: { idPartida: idPartida, numeroSet: 1 } });
      if (!setPartidaExistente) {
          // Cria o set
          const newset = await Set.create({
            numeroSet: 1, vencedorSet: null, placarTime1: 0, placarTime2: 0, idPartida
          });
          return newset;
      } else {
          throw new Error(`Set de partida ${idPartida} ja iniciada.`);
      }
  } catch (error) {
      console.error(`Erro ao tentar criar um novo set para a partida ${idPartida}.`, error);
      throw new Error(`Erro interno do servidor ao tentar criar um novo set para a partida ${idPartida}.`);
  }
};