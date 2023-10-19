const jwt = require('jsonwebtoken')
const dotenv  = require('dotenv')
dotenv.config()

// middleware para validar token
const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'Token não autorizado!' })
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next() // para continuar o fluxo
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
module.exports = checkToken;