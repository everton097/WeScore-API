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
        const partidaExistente = await Ponto.findOne({ where: { idPartida : idPartida, ptTime1 : 0, ptTime2 : 0, set  : 1 } })
        if (!partidaExistente) {
            // Cria o ponto
        const newPonto = await Ponto.create({
            idPartida, ptTime1 : 0, ptTime2 : 0, set  : 1, ladoQuadraTime1: null, ladoQuadraTime2: null, saqueInicial: null, idTime : null,
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
    const { ptTime1, ptTime2, set, ladoQuadraTime1, ladoQuadraTime2, saqueInicial, idTime } = req.body
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
        // Verifique se o set já existe
        const setExistente = await Ponto.findOne({ where: { idPartida : idPartida, set : set } })
        if (!setExistente) {
            return res.status(400).json({ error: "Set invalido ou inexistente." })
        }
        // Cria o ponto
        const newPonto = await Ponto.create({
            ptTime1, ptTime2, set, ladoQuadraTime1, ladoQuadraTime2, saqueInicial, idPartida, idTime
        }) 
        return res.status(200).json(newPonto)
    } catch (error) {
        console.log(`Erro ao tentar criar um novo ponto para a partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar criar um novo peonto para a partida ${idPartida}.`})
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
        const ponto = await Ponto.findOne({ where: { idPartida : idPartida },
            order: [['createdAt', 'DESC'], ['idPonto', 'DESC']]})
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
        const pontoInicial = await Ponto.findOne({ where: { idPartida : idPartida, ptTime1: 0, ptTime2: 0, set : 1, idTime: null } })
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
exports.createNewSet = async (req,res) => {
    const { idPartida } = req.params
    const { set, ladoQuadraTime1, ladoQuadraTime2, saqueInicial } = req.body
    
    // Validaçoes 
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    if(!set){
        return res.status(400).json({error : `O campo 'set' é obrigatorio.`})
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
        // Verifique se a partida já existe
        const partidaExistente = await Ponto.findOne({ where: { idPartida : idPartida, ptTime1 : 0, ptTime2 : 0, set  :  set} })
        if (!partidaExistente) {
            // Cria o ponto
            const newPonto = await Ponto.create({
                idPartida, ptTime1 : 0, ptTime2 : 0, set  : set, ladoQuadraTime1: ladoQuadraTime1, ladoQuadraTime2: ladoQuadraTime2, saqueInicial: saqueInicial, idTime : null,
            }) 
        return res.status(200).json(newPonto)
        }else{
            return res.status(400).json({ error: "Partida ja iniciada." })
        }
    } catch (error) {
        console.log(`Erro ao tentar criar um novo ponto para a partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar criar um novo peonto para a partida ${idPartida}.`})
    }
}