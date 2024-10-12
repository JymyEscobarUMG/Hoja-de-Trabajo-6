import { UsuarioType } from "../@types/types";

const buscarUsuarioPorDpi = (json: Array<UsuarioType>, dpi : string | undefined) => {
    const usuario = json.find(item => item.dpi === dpi);

    console.log(usuario)
    return usuario;
};

module.exports = {
    buscarUsuarioPorDpi
}