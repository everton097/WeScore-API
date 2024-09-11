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
exports.updateSetByID = async (req,res) => {
  const { idSet } = req.params
  const { vencedor, placarTime1, placarTime2 } = req.body
  // Validaçoes 
  if(!idSet){
      return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
  }
  if(!vencedor){
      return res.status(400).json({error : `O campo 'vencedor' é obrigatorio.`})
  }
  if(!placarTime1){
      return res.status(400).json({error : `O campo 'placarTime1' é obrigatorio.`})
  }
  if(!placarTime2){
      return res.status(400).json({error : `O campo 'placarTime2' é obrigatorio.`})
  }
  try {
      // Verifique se a set existe
      const set = await Set.findByPk(idSet)
      if (!set) {
          return res.status(404).json({ error: "Set não encontrada." })
      }
      // Atualiza o set
      await set.update({
          placarTime1, placarTime2, vencedorSet: vencedor
      })
      return res.status(200).json({message : `Ponto final atualizado com sucesso.`})
  } catch (error) {
      console.log(`Erro ao tentar atualizar o ponto final da partida.`)
      res.status(500).json({error : `Erro interno do servidor ao tentar atualizar o ponto final da partida ${idPartida}.`})
  }
}
exports.createNewSetInterno = async ({ idPartida, numeroSet }) => {
  try {
    console.log("debug set2: "+numeroSet);
      // Verifique se set da partida já existe
      const setPartidaExistente = await Set.findOne({ where: { idPartida: idPartida, numeroSet } });
      if (!setPartidaExistente) {
          // Cria o set
          const newset = await Set.create({
            numeroSet, vencedorSet: null, placarTime1: 0, placarTime2: 0, idPartida
          });
          return newset;
      } else {
          throw new Error(`Set ${numeroSet} da partida ${idPartida} ja iniciada.`);
      }
  } catch (error) {
      console.error(`Erro ao tentar criar um novo set para a partida ${idPartida}.`, error);
      throw new Error(`Erro interno do servidor ao tentar criar um novo set para a partida ${idPartida}.`);
  }
};