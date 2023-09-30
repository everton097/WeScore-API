const express = require('express')
const app = express()
const bodyParser = require('body-parser')//para vim formulario simples e URL encoder
const path = require('path')
const sequelize = require('./src/conn/connection')
//Import routes
const timeRoutes = require('./src/routes/timeRoutes')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extends : true}))

app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/time',timeRoutes)


//Inicialização do servidor se conseguir conectar ao banco de dados
const PORT = process.env.PORT || 3001

sequelize.sync({force : true})
    .then(() => {
        console.log(`Conectado ao DB Mysql`)
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Erro ao conectar no DB: ${error}`)
    })