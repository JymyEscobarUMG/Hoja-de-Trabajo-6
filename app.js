const express = require('express');
const cors = require('cors')
const { leerDB, guardarDB } = require('./helpers/guardarArchivo');
const { buscarUsuarioPorDpi } = require('./helpers/validarDPI');
const { validarToken } = require('./middlewares/jwt-ValidarToken');
const jsonwebtoken = require('jsonwebtoken');
const app = express()
const port = 3000

require('dotenv').config();

//Se configura los cors
app.use(cors());
//Configuramos para aceptar json en el body
app.use(express.json());


//Obtenemos lo usuarios del archivo ./db/usuarios.json
const usuarios = leerDB();

//Endpoint para obtener todos los usuario 
app.get('/users', validarToken, (req, res) => {
    res.json(usuarios)
})

//Endpoint para registrar nuevo usuario.
app.post('/users', validarToken, (req, res) => {
    const { dpi, name, email, password } = req.body;

    if (dpi == undefined || buscarUsuarioPorDpi(usuarios, dpi) != undefined) {
        return res.status(400).send("El dpi no es válido.");
    }

    usuarios.push({ dpi, name, email, password });
    guardarDB(usuarios);

    res.status(200).send("Usuario registrado exitosamente!!!.");
})

//Endpoint para actualizar usuario.
app.put('/users/:dpi', validarToken, (req, res) => {
    const { dpi } = req.params;
    const { dpi: dpiBody, name, email, password } = req.body;

    if (dpiBody != undefined) {
        return res.status(400).send("No se puede modificar el DPI desde el Body.");
    }

    if (dpi == undefined) {
        return res.status(400).send("El  DPI proporcionado en la URL no existe.");
    }

    const usuarioABuscar = buscarUsuarioPorDpi(usuarios, dpi);
    if (dpi == undefined || usuarioABuscar == undefined) {
        return res.status(400).send("El  DPI proporcionado en la URL no existe.");
    }

    const nuevoUsuario = { dpi, name, email, password };
    const index = usuarios.findIndex(item => item.dpi === dpi);
    usuarios[index] = { ...usuarios[index], ...nuevoUsuario };
    guardarDB(usuarios);

    res.status(200).send(`Usuario con DPI ${dpi} actualizado exitosamente`);
})

//Endpoint para eliminar usuario.
app.delete('/users/:dpi', validarToken, (req, res) => {
    const { dpi } = req.params;

    const usuarioABuscar = buscarUsuarioPorDpi(usuarios, dpi);
    if (dpi == undefined || usuarioABuscar == undefined) {
        return res.status(400).send("El  DPI proporcionado en la URL no existe.");
    }

    const data = usuarios.filter(item => item.dpi !== dpi);
    guardarDB(data);

    res.status(200).send(`Usuario con DPI ${dpi} eliminado exitosamente`);
})

app.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    const usuario = usuarios.find(item => item.email == email && item.password == password );

    if (!usuario) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jsonwebtoken.sign({ dpi: usuario.dpi, email: usuario.email }, process.env.PALABRA_SECRETA, {
        expiresIn: process.env.TIEMPO_EXPIRACION
    });

    res.status(200).json({ message: 'Login exitoso', token });
});


app.listen(port, () => {
    console.log(`Aplicacion corriendo en http://localhost:${port}`)
})