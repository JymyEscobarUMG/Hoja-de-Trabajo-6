const jsonwebtoken = require("jsonwebtoken");

const validarToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    jsonwebtoken.verify(token.split(' ')[1], process.env.PALABRA_SECRETA, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
};

module.exports = {
    validarToken
}