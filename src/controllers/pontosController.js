const Ponto = require('../models/ponto')
const Partida = require('../models/partida')
// Cria uma nova pontuação para uma partida
exports.createPonto = async (req,res) => {
    const { idPartida } = req.params
    // Validaçoes 
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Verifique se a partida já existe
        const partidaExistente = await Ponto.findOne({ where: { idPartida : idPartida, set : 0 } })
        if (!partidaExistente) {
            // Cria o ponto
        const newPonto = await Ponto.create({
            idPartida, idTime : null, ptTime1 : 0, ptTime2 : 0, set  : 1
        }) 
        return res.status(200).json({ data: newPonto })
        }else{
            return res.status(400).json({ error: "Partida ja iniciada." })
        }
    } catch (error) {
        console.log(`Erro ao tentar criar um novo ponto para a partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar criar um novo peonto para a partida ${idPartida}.`})
    }
}
exports.createPontoInterno = async ({ idPartida }) => {
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida);
        if (!partida) {
            throw new Error("Partida não encontrada.");
        }

        // Verifique se a partida já existe
        const partidaExistente = await Ponto.findOne({ where: { idPartida: idPartida, set: 0 } });
        if (!partidaExistente) {
            // Cria o ponto
            const newPonto = await Ponto.create({
                idPartida, idTime: null, ptTime1: 0, ptTime2: 0, set: 1
            });
            return newPonto;
        } else {
            throw new Error("Partida ja iniciada.");
        }
    } catch (error) {
        console.error(`Erro ao tentar criar um novo ponto para a partida ${idPartida}.`, error);
        throw new Error(`Erro interno do servidor ao tentar criar um novo ponto para a partida ${idPartida}.`);
    }
};
exports.plusPonto = async (req,res) => {
    const { idPartida } = req.params
    const { idTime, ptTime1, ptTime2, set } = req.body
    // Validaçoes 
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    if(!idTime){
        return res.status(400).json({error : `O campo 'idTime' é obrigatorio.`})
    }
    if(!ptTime1){
        return res.status(400).json({error : `O campo 'ptTime1' é obrigatorio.`})
    }
    if(!ptTime2){
        return res.status(400).json({error : `O campo 'ptTime2' é obrigatorio.`})
    }
    if(!set){
        return res.status(400).json({error : `O campo 'set' é obrigatorio.`})
    }
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Verifique se o set já existe
        const setExistente = await Ponto.findOne({ where: { idPartida : idPartida, set : set } })
        if (!setExistente) {
            return res.status(400).json({ error: "Set invalido ou inexistente." })
        }
        // Cria o ponto
        const newPonto = await Ponto.create({
            idPartida, idTime, ptTime1, ptTime2, set 
        }) 
        return res.status(200).json({ data: newPonto })
    } catch (error) {
        console.log(`Erro ao tentar criar um novo ponto para a partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar criar um novo peonto para a partida ${idPartida}.`})
    }
}
exports.minusPonto = async (req,res) => {
    const { idPartida } = req.params
    const { idTime, ptTime1, ptTime2, set } = req.body
    // Validaçoes 
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    if(!idTime){
        return res.status(400).json({error : `O campo 'idTime' é obrigatorio.`})
    }
    if(!ptTime1){
        return res.status(400).json({error : `O campo 'ptTime1' é obrigatorio.`})
    }
    if(!ptTime2){
        return res.status(400).json({error : `O campo 'ptTime2' é obrigatorio.`})
    }
    if(!set){
        return res.status(400).json({error : `O campo 'set' é obrigatorio.`})
    }
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Verifica qual foi o ultimo ponto 
        const lastPoint = await Ponto.findOne({ where: { idPartida : idPartida, set : set },order: [['createdAt', 'DESC']] })
        // Verifique se o ponto existe
        const pontoExistente = await Ponto.findOne({ where: { idPartida : idPartida, ptTime1 : ptTime1, ptTime2 : ptTime2, set : set },order: [['createdAt', 'DESC']] })
        if (!pontoExistente) {
            return res.status(400).json({ error: "Ponto invalido ou inexistente." })
        }
        if(lastPoint.idPartida == pontoExistente.idPartida && lastPoint.idTime == pontoExistente.idTime && lastPoint.set == pontoExistente.set){
            // apaga o ponto
            await pontoExistente.destroy() 
            return res.status(200).json({message : `Ponto excluído com sucesso.`})
        }else{
            return res.status(400).json({ "error": "Ponto não corresponde ao último registro na partida, Apenas o último ponto pode ser removido." })
        }
    } catch (error) {
        console.log(`Erro ao tentar apagar o ultimo ponto para a partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar apagar o ultimo ponto para a partida ${idPartida}.`})
    }
}
// Get das pontuações da partida
exports.getAllPontosByPartida = async (req,res) => {
    const { idPartida } = req.params
    // Validaçoes 
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Verifique se Pontos já existe
        const pontos = await Ponto.findAll({ where: { idPartida : idPartida },order: [['createdAt', 'ASC']] })
        if (pontos.length == 0) {
            return res.status(404).json({ error: "Pontos não encontrados." })
        }
        return res.status(200).json(pontos)
    } catch (error) {
        console.log(`Erro ao tentar buscar os pontos da partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar buscar os pontos da partida ${idPartida}.`})
    }
}
// Get do ultimo ponto feito na partida
exports.getLastPontoByPartida = async (req,res) => {
    const { idPartida } = req.params
    // Validaçoes 
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Verifique se Pontos já existe
        const ponto = await Ponto.findOne({ where: { idPartida : idPartida },order: [['createdAt', 'DESC']] })
        if (!ponto) {
            return res.status(404).json({ error: "Ponto não encontrado." })
        }
        return res.status(200).json(ponto)
    } catch (error) {
        console.log(`Erro ao tentar buscar o ultimo ponto da partida ${idPartida}.\n ${error}`)
        res.status(500).json({error : `Erro interno do servidor ao tentar buscar o ultimo ponto da partida ${idPartida}.`})
    }
}
// PUT para atualizar informações do ponto inicial, definindo lado da quadra para time1 e time2 e saque
exports.updatePontoInicial = async (req,res) => {
    const { idPartida } = req.params
    const { ladoQuadraTime1, ladoQuadraTime2, saqueInicial } = req.body
    // Validaçoes 
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    if(!ladoQuadraTime1){
        return res.status(400).json({error : `O campo 'ladoQuadraTime1' é obrigatorio.`})
    }
    if(!ladoQuadraTime2){
        return res.status(400).json({error : `O campo 'ladoQuadraTime2' é obrigatorio.`})
    }
    if(!saqueInicial){
        return res.status(400).json({error : `O campo 'saqueInicial' é obrigatorio.`})
    }
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Verifique se o ponto inicial já existe
        const pontoInicial = await Ponto.findOne({ where: { ptTime1: 0, ptTime2: 0, set : 1, idPartida : idPartida } })
        if (!pontoInicial) {
            return res.status(404).json({ error: "Ponto inicial não encontrado." })
        }
        // Atualiza o ponto inicial
        await pontoInicial.update({
            ladoQuadraTime1, ladoQuadraTime2, saqueInicial
        })
        return res.status(200).json({message : `Ponto inicial atualizado com sucesso.`})
    } catch (error) {
        console.log(`Erro ao tentar atualizar o ponto inicial da partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar atualizar o ponto inicial da partida ${idPartida}.`})
    }
}
