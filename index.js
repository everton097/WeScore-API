const express = require('express')
const app = express()
const bodyParser = require('body-parser')//para vim formulario simples e URL encoder
const path = require('path')
const sequelize = require('./src/conn/connection')
//Import routes
const timeRoutes = require('./src/routes/timeRoutes')
const usuarioRoutes = require('./src/routes/usuarioRoutes')
const jogadorRouter = require('./src/routes/jogadorRoutes')
const campeonatoRouter = require('./src/routes/campeonatoRouter')
const time_campeonatoRouter = require('./src/routes/time_campeonatoRouter')
const dotenv  = require('dotenv')

dotenv.config()
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extends : true}))

app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/time',timeRoutes)
app.use('/usuario',usuarioRoutes)
app.use('/jogador',jogadorRouter)
app.use('/campeonato',campeonatoRouter)
app.use('/time_campeonato',time_campeonatoRouter)


//Inicialização do servidor se conseguir conectar ao banco de dados
const PORT = process.env.PORT || 3001
console.log(process.env.JWT_EXPIRES_IN)
const forceSync = process.env.DB_FORCE === 'true';//`=== 'true'` converte o valor para um booleano, para ser interpretado corretamente do force
sequelize.sync({ force : forceSync })
    .then(() => {
        console.log(`Conectado ao DB Mysql`)
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Erro ao conectar no DB: ${error}`)
    })