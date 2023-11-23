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
    console.log({
        message: `${usuario.nomeUsuario} está autenticado!`,
        token: token,
        userName: usuario.nomeUsuario,
        userMail: usuario.email,
        userId: usuario.idUsuario,
        userLogo: usuario.logoUsuario
    })
    return res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: usuario.idUsuario,
        userName: usuario.nomeUsuario,
        userMail: usuario.email,
        userLogo: usuario.logoUsuario
    })
}
module.exports = createUserToken;