const fs = require('fs');
const ruta = './db/usuarios.json';

const guardarDB = (data) => {
    fs.writeFileSync(ruta, JSON.stringify(data));
}

const leerDB = () => {
    if (fs.existsSync(ruta)) {
        const archivo = fs.readFileSync(ruta, { encoding: 'utf-8' });
        const data = JSON.parse(archivo);

        return data;
    } else {
        return null;
    }
}

module.exports = {
    guardarDB,
    leerDB,
}