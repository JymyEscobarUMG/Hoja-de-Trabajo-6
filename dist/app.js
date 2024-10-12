"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const { leerDB, guardarDB } = require('./helpers/guardarArchivo');
const { buscarUsuarioPorDpi } = require('./helpers/validarDPI');
const { validarToken } = require('./middlewares/jwt-ValidarToken');
const jsonwebtoken = require('jsonwebtoken');
const app = (0, express_1.default)();
const port = 3000;
require('dotenv').config();
//Se configura los cors
app.use(cors());
//Configuramos para aceptar json en el body
app.use(express_1.default.json());
//Obtenemos lo usuarios del archivo ./db/usuarios.json
const usuarios = leerDB();
//Endpoint para obtener todos los usuario 
app.get('/users', validarToken, (req, res) => {
    res.json(usuarios);
});
//Endpoint para registrar nuevo usuario.
app.post('/users', validarToken, (req, res) => {
    const { dpi, name, email, password } = req.body;
    if (dpi == undefined || buscarUsuarioPorDpi(usuarios, dpi) != undefined) {
        res.status(400).send("El dpi no es válido.");
        return;
    }
    usuarios.push({ dpi, name, email, password });
    guardarDB(usuarios);
    res.status(200).send("Usuario registrado exitosamente!!!.");
});
//Endpoint para actualizar usuario.
app.put('/users/:dpi', validarToken, (req, res) => {
    const { dpi } = req.params;
    const { dpi: dpiBody, name, email, password } = req.body;
    if (dpiBody != undefined) {
        res.status(400).send("No se puede modificar el DPI desde el Body.");
        return;
    }
    if (dpi == undefined) {
        res.status(400).send("El  DPI proporcionado en la URL no existe.");
        return;
    }
    const usuarioABuscar = buscarUsuarioPorDpi(usuarios, dpi);
    if (dpi == undefined || usuarioABuscar == undefined) {
        res.status(400).send("El  DPI proporcionado en la URL no existe.");
        return;
    }
    const nuevoUsuario = { dpi, name, email, password };
    const index = usuarios.findIndex(item => item.dpi === dpi);
    usuarios[index] = Object.assign(Object.assign({}, usuarios[index]), nuevoUsuario);
    guardarDB(usuarios);
    res.status(200).send(`Usuario con DPI ${dpi} actualizado exitosamente`);
});
//Endpoint para eliminar usuario.
app.delete('/users/:dpi', validarToken, (req, res) => {
    const { dpi } = req.params;
    const usuarioABuscar = buscarUsuarioPorDpi(usuarios, dpi);
    if (dpi == undefined || usuarioABuscar == undefined) {
        res.status(400).send("El  DPI proporcionado en la URL no existe.");
        return;
    }
    const data = usuarios.filter(item => item.dpi !== dpi);
    guardarDB(data);
    res.status(200).send(`Usuario con DPI ${dpi} eliminado exitosamente`);
});
app.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios.find(item => item.email == email && item.password == password);
    if (!usuario) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
    }
    const token = jsonwebtoken.sign({ dpi: usuario.dpi, email: usuario.email }, process.env.PALABRA_SECRETA, {
        expiresIn: process.env.TIEMPO_EXPIRACION
    });
    res.status(200).json({ message: 'Login exitoso', token });
});
app.listen(port, () => {
    console.log(`Aplicacion corriendo en http://localhost:${port}`);
});
