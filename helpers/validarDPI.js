const buscarUsuarioPorDpi = (json, dpi) => {
    const usuario = json.find(item => item.dpi === dpi);

    console.log(usuario)
    return usuario;
};

module.exports = {
    buscarUsuarioPorDpi
}