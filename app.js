const express = require('express');
const cors = require('cors')
const { leerDB, guardarDB, actualizarUsuario } = require('./helpers/guardarArchivo');
const { buscarUsuarioPorDpi } = require('./helpers/validarDPI');
const app = express()
const port = 3000

require('dotenv').config();

//Se configura los cors
app.use(cors());
//Configuramos para aceptar json en el body
app.use( express.json() );


//Obtenemos lo usuarios del archivo ./db/usuarios.json
const usuarios = leerDB();

//Endpoint para obtener todos los usuario 
app.get('/users', (req, res) => {
    res.json(usuarios)
})

//Endpoint para registrar nuevo usuario.
app.post('/users', (req, res) => {
    const { dpi, name, email, password} = req.body;
    
    if(dpi == undefined || buscarUsuarioPorDpi(usuarios, dpi) != undefined ) {
        return res.status(400).send("El dpi no es válido.");
    }

    usuarios.push({dpi, name, email, password});
    guardarDB(usuarios);
    
    res.status(200).send("Usuario registrado exitosamente!!!.");
})

//Endpoint para actualizar usuario.
app.put('/users/:dpi', (req, res) => {
    const {dpi} = req.params;
    const { dpi:dpiBody, name, email, password} = req.body;
    
    if(dpiBody != undefined) {
        return res.status(400).send("No se puede modificar el DPI desde el Body.");
    }

    if(dpi == undefined) {
        return res.status(400).send("El  DPI proporcionado en la URL no existe.");
    }

    const usuarioABuscar = buscarUsuarioPorDpi(usuarios, dpi);
    if(dpi == undefined || usuarioABuscar == undefined) {
        return res.status(400).send("El  DPI proporcionado en la URL no existe.");
    }

    const nuevoUsuario = {dpi, name, email, password};
    const index = usuarios.findIndex(item => item.dpi === dpi);
    usuarios[index] = { ...usuarios[index], ...nuevoUsuario };
    guardarDB(usuarios);

    res.status(200).send(`Usuario con DPI ${dpi} actualizado exitosamente`);
})

//Endpoint para eliminar usuario.
app.delete('/users/:dpi', (req, res) => {
    const {dpi} = req.params;

    const usuarioABuscar = buscarUsuarioPorDpi(usuarios, dpi);
    if(dpi == undefined || usuarioABuscar == undefined) {
        return res.status(400).send("El  DPI proporcionado en la URL no existe.");
    }

    const data = usuarios.filter(item => item.dpi !== dpi);
    guardarDB(data);

    res.status(200).send(`Usuario con DPI ${dpi} eliminado exitosamente`);
})

app.listen(port, () => {
  console.log(`Aplicacion corriendo en http://localhost:${port}`)
})