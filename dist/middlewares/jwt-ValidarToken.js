"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken = require("jsonwebtoken");
const validarToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({ message: 'Token requerido' });
        return;
    }
    jsonwebtoken.verify(token.split(' ')[1], process.env.PALABRA_SECRETA, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Token inválido' });
            return;
        }
        //req.user = user;
        next();
    });
};
module.exports = {
    validarToken
};
