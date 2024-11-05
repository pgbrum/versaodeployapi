let listaUsuarios = [];
let idGerador = 1;

function listar() {
    return listaUsuarios;
}

function inserir(usuario) {
    if(!usuario || !usuario.nome || !usuario.cpf 
        || !usuario.email) {
            return;
    }
    usuario.id = idGerador++;
    listaUsuarios.push(usuario);
    return usuario;
}

function buscarPorId(id) {
    return (listaUsuarios.find(
        function(usuario) {
            return (usuario.id == id);
        }
    ));
}

function atualizar(id, usuario) {
    if(!usuario || !usuario.nome || !usuario.cpf 
        || !usuario.email) {
            return;
    }
    let indiceUsuario = listaUsuarios.findIndex(function(usuario) {
        return (usuario.id == id);
    })

    if(indiceUsuario == -1) return;
    usuario.id = id;
    listaUsuarios[indiceUsuario] = usuario;
    return usuario;
}

function deletar(id) {
    let indiceUsuario = listaUsuarios.findIndex(function(usuario) {
        return (usuario.id == id);
    })
    if(indiceUsuario == -1) return;
    return (listaUsuarios.splice(indiceUsuario, 1))[0];
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
}
