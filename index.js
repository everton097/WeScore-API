const express = require("express")
const exphds = require("express-handlebars")
const app = express()
const port = 3000

app.engine('handlebars', exphds.engine())
app.set('view engine', 'handlebars')

const path = require("path")
const basePath = path.join(__dirname,'templates')

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.use(express.static('public'))


// GET route for homepage
app.get('/', function(req,res){
        res.render('home')
})
//GET route for notes page
app.get('/jogos', function(req,res){
    res.render('jogos')
})


app.listen(port, ()=>{
    console.log(`Servidor rodando: http://localhost:${port}`)
})