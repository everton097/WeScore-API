const express = require('express')
const app = express()
const bodyParser = require('body-parser')//para vim formulario simples e URL encoder
const path = require('path')
const sequelize = require('./src/conn/connection')
const dotenv  = require('dotenv')
const cors = require('cors');
const WebSocket = require("ws")
const { bold, red, green, cyan } = require('kleur');
const {appWs} = require("./src/helpers/app-ws")
//Import routes
const timeRoutes = require('./src/routes/timeRoutes')
const usuarioRoutes = require('./src/routes/usuarioRoutes')
const jogadorRoutes = require('./src/routes/jogadorRoutes')
const campeonatoRoutes = require('./src/routes/campeonatoRoutes')
const time_campeonatoRoutes = require('./src/routes/time_campeonatoRoutes')
const partidaRoutes = require('./src/routes/partidaRoutes')
const pontoRoutes = require('./src/routes/pontoRoutes')
const substituicaoRoutes = require('./src/routes/substituicaoRoutes')
const bannerRouters = require('./src/routes/bannerRoutes')
const posicaoRouters = require('./src/routes/posicaoRoutes')
const setRouters = require('./src/routes/setRoutes')
// Lê as configurações do .env
dotenv.config() 
// Middleware para o corpo da solicitação JSON
app.use(bodyParser.json())
// Configurar o middleware bodyParser.urlencoded() para "form url encoded"
app.use(bodyParser.urlencoded({extends : true}))
/* // Configuração de arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public'))) */
// Configuração do caminho estático
app.use('/public', express.static('public'));

// Configurar o middleware CORS - Permite todas as origens `http://localhost:3002` acesse os recursos da API
const corsOptions = {
    origin: ['http://localhost:3002']
}
app.use(cors(corsOptions));

//Routes
app.use('/time',timeRoutes)
app.use('/usuario',usuarioRoutes)
app.use('/jogador',jogadorRoutes)
app.use('/campeonato',campeonatoRoutes)
app.use('/time_campeonato',time_campeonatoRoutes)
app.use('/partida', partidaRoutes)
app.use('/ponto', pontoRoutes)
app.use('/substituicao', substituicaoRoutes)
app.use('/banner', bannerRouters)
app.use('/posicao', posicaoRouters)
app.use('/set', setRouters)

//Inicialização do servidor se conseguir conectar ao banco de dados
const PORT = process.env.PORT || 3001
const forceSync = process.env.DB_FORCE === 'true';//`=== 'true'` converte o valor para um booleano, para ser interpretado corretamente do force
sequelize.sync({ force : forceSync })
.then(() => {
    console.log(bold().cyan(`Banco de dados Mysql sincronizado com sucesso!`));
    const server = app.listen(PORT, () => {
        console.log(bold().green(`Servidor rodando na porta ${PORT}`))
    })
    // Cria o WebSocket Server baseado no servidor HTTP do Express
    appWs(server)
})
.catch((error) => {
    console.log(bold().red(`Erro ao conectar no DB: ${error}`))
})
