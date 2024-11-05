const usuarioRepository = require('../repository/usuario_repository')

function listar() {
    return usuarioRepository.listar();
}

function inserir(usuario) {
    if(usuario && usuario.nome 
        && usuario.cpf && usuario.email){
            return usuarioRepository.inserir(usuario);
    }
    else {
        throw { id: 400, msg: "Usuário sem dados corretos"}
    }
}

function buscarPorId(id) {
    let usuario = usuarioRepository.buscarPorId(id);
    if(usuario) {
        return usuario;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}

function atualizar(id, usuario) {
    if(usuario && usuario.nome && usuario.cpf && usuario.email) {
        const usuarioAtualizado = usuarioRepository.atualizar(id, usuario);
        if(usuarioAtualizado) {
            return usuarioAtualizado;
        }        
        else {
            throw {id:404, msg: "Usuário não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Usuário sem dados corretos"};
    }
}

function deletar(id) {
    let usuario = usuarioRepository.deletar(id);
    if(usuario) {
        return usuario;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}