const jwt = require("jsonwebtoken");

const createUserToken = async (usuario, req, res) => {
    const token = jwt.sign(
        // payload data
        {
            mail: usuario.email,
            id: usuario.id,
        },
        //Secret
        process.env.JWT_SECRET,
        {
        expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
    
    return res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userMail: usuario.email,
        userId: usuario.id,
    })
}
module.exports = createUserToken;