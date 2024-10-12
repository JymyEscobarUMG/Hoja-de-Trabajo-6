import express, { Request, Response, NextFunction } from 'express';

const jsonwebtoken = require("jsonwebtoken");

const validarToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(403).json({ message: 'Token requerido' });
        return
    }

    jsonwebtoken.verify(token.split(' ')[1], process.env.PALABRA_SECRETA, (err: any, user: any) => {
        if (err) {
            res.status(403).json({ message: 'Token inválido' });
            return
        }

        //req.user = user;
        next();
    });
};

module.exports = {
    validarToken
}