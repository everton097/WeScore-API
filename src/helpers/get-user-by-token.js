const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const dotenv  = require('dotenv')
dotenv.config()

//obter usuário por token jwt
const getUserByToken = async (token) => {
    if (!token) return res.status(401).json({ error: "Acesso negado!" });

    //encontrar usuário
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    const usuario = await Usuario.findOne({where: { id: userId }});

    return usuario;
}
module.exports = getUserByToken;