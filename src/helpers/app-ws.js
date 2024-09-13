
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

let wss;

function onError(ws, err) {
  console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
  console.log(`Mensagem recebida: ${data}`);
  ws.send(`Você disse: ${data}`);
}
// Escuta conexões WebSocket
function onConnection(ws, req) {
  // Enviar mensagem de boas-vindas ao cliente
  ws.send(JSON.stringify({ message: 'Bem-vindo ao WebSocket WS' }));

  // Escuta mensagens enviadas pelo cliente
  ws.on('message', data => onMessage(ws, data));
  // Escuta mensagens erros
  ws.on('error', error => onError(ws, error));

  console.log(
    `Novo cliente conectado via WebSocket. \nID: ${uuidv4()}`
  );
  // Lida com a desconexão do cliente
  ws.on('close', () => {
    console.log('Cliente desconectado.');
  });
}

// Função para enviar atualizações para todos os clientes conectados
exports.broadcastWS = (data) => {
  try {
    console.log('Broadcasting data:', data); // Log para verificação
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data)); // Envia o dado formatado para todos os clientes
          // Log para verificar se o envio está funcionando
          console.log('Mensagem enviada para cliente:', data);
        }
      });
    }else{
      console.error(`Erro ao tentar eviar nova mensagem via WebSocket-WSapi. WebSocket Server não inicializado.`);
    }
  } catch (error) {
      console.error(`Erro ao tentar eviar nova mensagem via WebSocket-WSapi ${data}.`, error);
      throw new Error(`Erro interno do servidor ao tentar eviar nova mensagem via WebSocket-WSapi ${data}.`);
  }
};

exports.appWs = (server) => {
  // Cria o WebSocket Server baseado no servidor HTTP do Express
  wss = new WebSocket.Server({server});
  // Escuta conexões WebSocket
  wss.on('connection', onConnection);

  console.log(`App Web Socket Server rodando com sucesso!`);
  return wss;
}