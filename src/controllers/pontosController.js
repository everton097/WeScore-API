const Ponto = require('../models/ponto')
const Partida = require('../models/partida')
const Set = require('../models/set')
const setController = require("../controllers/setController")
const { broadcastWS } = require('../helpers/app-ws');
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
        const partidaExistente = await Ponto.findOne({ where: { idPartida : idPartida, ptTime1 : 0, ptTime2 : 0} })
        if (!partidaExistente) {
            // Cria o ponto
            const newset = await setController.createSetInterno({ idPartida: idPartida });
            const newPonto = await Ponto.create({
                idPartida, ptTime1 : 0, ptTime2 : 0, ladoQuadraTime1: null, ladoQuadraTime2: null, saqueInicial: null, idTime : null, idSet: newset.idSet
            }) 
        return res.status(200).json({ data: newPonto })
        }else{
            return res.status(400).json({ error: "Partida ja iniciada." })
        }
    } catch (error) {
        console.log(`Metodo: createPonto -> Erro ao tentar criar um novo ponto para a partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar criar um novo ponto para a partida ${idPartida}.`})
    }
}
exports.createPontoInterno = async ({ idPartida }) => {
    try {
        // Verifique se a partida já existe
        const partidaExistente = await Ponto.findOne({ where: { idPartida: idPartida } });
        if (!partidaExistente) {
            // Cria o ponto
            const newset = await setController.createSetInterno({ idPartida: idPartida });
            const newPonto = await Ponto.create({
                idPartida, ptTime1 : 0, ptTime2 : 0, ladoQuadraTime1: null, ladoQuadraTime2: null, saqueInicial: null, idTime : null, idSet: newset.idSet
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
    const { ptTime1, ptTime2, idSet, ladoQuadraTime1, ladoQuadraTime2, saqueInicial, idTime, } = req.body
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
    if(!idSet){
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
        const setExistente = await Set.findByPk(idSet)
        if (!setExistente) {
            return res.status(400).json({ error: "Set invalido ou inexistente." })
        }
        // Cria o ponto
        const newPonto = await Ponto.create({
            idPartida, ptTime1, ptTime2, ladoQuadraTime1, ladoQuadraTime2, saqueInicial, idTime, idSet,
        })
        
        // Busca o ponto criado com os dados do set incluídos
        const pontoComSet = await Ponto.findByPk(newPonto.idPonto, {
            include: [{ model: Set, as: "pontos_set" }]
        });
        
        // Map para mudar JSON no padrão antigo do front.
        const pontoResponse = {
            idPonto: pontoComSet.idPonto,
            ptTime1: pontoComSet.ptTime1,
            ptTime2: pontoComSet.ptTime2,
            ladoQuadraTime1: pontoComSet.ladoQuadraTime1,
            ladoQuadraTime2: pontoComSet.ladoQuadraTime2,
            saqueInicial: pontoComSet.saqueInicial,
            idSet: pontoComSet.idSet,
            idTime: pontoComSet.idTime,
            idPartida: pontoComSet.idPartida,
            set: pontoComSet.pontos_set.numeroSet,
            vencedor: pontoComSet.pontos_set.vencedorSet,
            placarTime1: pontoComSet.pontos_set.placarTime1,
            placarTime2: pontoComSet.pontos_set.placarTime2,
            createdAt: pontoComSet.createdAt,
            updatedAt: pontoComSet.updatedAt,
        };
        // Broadcast para WebSocket
        broadcastWS(pontoResponse);
        return res.status(200).json(pontoResponse);
    } catch (error) {
        console.log(`Metodo: plusPonto -> Erro ao tentar criar um novo ponto para a partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar criar um novo ponto para a partida ${idPartida}.`})
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
            order: [['createdAt', 'DESC'], ['idPonto', 'DESC']],
            include: [{ model: Set, as: "pontos_set" }],
        })
        if (!ponto) {
            return res.status(404).json({ error: "Ponto não encontrado." })
        }
        // Map para mudar JSON no padrão antigo do front.
        const pontoResponse = {
            idPonto: ponto.idPonto,
            ptTime1: ponto.ptTime1,
            ptTime2: ponto.ptTime2,
            ladoQuadraTime1: ponto.ladoQuadraTime1,
            ladoQuadraTime2: ponto.ladoQuadraTime2,
            saqueInicial: ponto.saqueInicial,
            idSet: ponto.idSet,
            idTime: ponto.idTime,
            idPartida: ponto.idPartida,
            set: ponto.pontos_set.numeroSet,
            vencedor: ponto.pontos_set.vencedorSet,
            placarTime1: ponto.pontos_set.placarTime1,
            placarTime2: ponto.pontos_set.placarTime2,
            createdAt: ponto.createdAt,
            updatedAt: ponto.updatedAt,
        };
        return res.status(200).json(pontoResponse);
    } catch (error) {
        console.log(`Erro ao tentar buscar o ultimo ponto da partida ${idPartida}.\n ${error}`)
        res.status(500).json({error : `Erro interno do servidor ao tentar buscar o ultimo ponto da partida ${idPartida}.`})
    }
}
// PUT para atualizar informações do ponto inicial, definindo lado da quadra para time1 e time2 e saque
exports.updatePontoInicial = async (req,res) => {
    const { idPartida } = req.params
    const { ladoQuadraTime1, ladoQuadraTime2, saqueInicial, idSet } = req.body
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
    if(!idSet){
        return res.status(400).json({error : `O campo 'idSet' é obrigatorio.`})
    }
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Verifique se o ponto inicial já existe
        const pontoInicial = await Ponto.findOne({ where: { idPartida : idPartida, ptTime1: 0, ptTime2: 0, idSet, idTime: null } })
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
exports.updatePontoFinal = async (req,res) => {
    const { idPartida } = req.params
    const { set, vencedor, placarTime1, placarTime2 } = req.body
    // Validaçoes 
    if(!idPartida){
        return res.status(400).json({error : `O campo 'idPartida' é obrigatorio.`})
    }
    if(!set){
        return res.status(400).json({error : `O campo 'set' é obrigatorio.`})
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
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Verifique se o ponto final já existe
        const pontoFinal = await Ponto.findOne({ 
            where: { idPartida : idPartida, set : set, vencedor: null },
            order: [['createdAt', 'DESC'], ['idPonto', 'DESC']] })
        if (!pontoFinal) {
            return res.status(404).json({ error: "Ponto final não encontrado." })
        }
        // Atualiza o ponto final do set
        await pontoFinal.update({
            placarTime1, placarTime2, vencedor
        })
        return res.status(200).json({message : `Ponto final atualizado com sucesso.`})
    } catch (error) {
        console.log(`Erro ao tentar atualizar o ponto final da partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar atualizar o ponto final da partida ${idPartida}.`})
    }
}
exports.createNewSet = async (req,res) => {
    const { idPartida } = req.params
    const { set, ladoQuadraTime1, ladoQuadraTime2, saqueInicial, placarTime1, placarTime2 } = req.body
    
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
    if(!placarTime1){
        return res.status(400).json({error : `O campo 'placarTime1' é obrigatorio.`})
    }
    if(!placarTime2){
        return res.status(400).json({error : `O campo 'placarTime2' é obrigatorio.`})
    }
    try {
        // Verifique se a partida existe
        const partida = await Partida.findByPk(idPartida)
        if (!partida) {
            return res.status(404).json({ error: "Partida não encontrada." })
        }
        // Tenta criar novo set, e verifica se ele jé existe.
        const newset = await setController.createNewSetInterno({ idPartida: idPartida, numeroSet: set });
        if (newset) {
            // Cria o ponto            
            const newPonto = await Ponto.create({
                idPartida, ptTime1 : 0, ptTime2 : 0, idSet  : newset.idSet, ladoQuadraTime1: ladoQuadraTime1, ladoQuadraTime2: ladoQuadraTime2, saqueInicial: saqueInicial, idTime : null,
            }) 
        return res.status(200).json(newPonto)
        }else{
            return res.status(400).json({ error: "Set de Partida ja iniciada." })
        }
    } catch (error) {
        console.log(`Erro ao tentar criar um novo set/ponto para a partida ${idPartida}.`)
        res.status(500).json({error : `Erro interno do servidor ao tentar criar um novo ponto/set para a partida ${idPartida}.`})
    }
}