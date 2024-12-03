const usuarioRepositoryBD = require('../repository/usuario_repository_bd');

async function listar() {
    return await usuarioRepositoryBD.listar();
}

async function inserir(usuario) {
    if (usuario && usuario.nome && usuario.cpf && usuario.email) {
        return await usuarioRepositoryBD.inserir(usuario);
    } else {
        throw { id: 400, msg: "Usuário sem dados corretos" };
    }
}

async function buscarPorId(id) {
    let usuario = await usuarioRepositoryBD.buscarPorId(id);
    if (usuario) {
        return usuario;
    } else {
        throw { id: 404, msg: "Usuário não encontrado!" };
    }
}

async function atualizar(id, usuario) {
    if (usuario && usuario.nome && usuario.cpf && usuario.email) {
        const usuarioAtualizado = await usuarioRepositoryBD.atualizar(id, usuario);
        if (usuarioAtualizado) {
            return usuarioAtualizado;
        } else {
            throw { id: 404, msg: "Usuário não encontrado" };
        }
    } else {
        throw { id: 400, msg: "Usuário sem dados corretos" };
    }
}

async function deletar(id) {
    let usuario = await usuarioRepositoryBD.deletar(id);
    if (usuario) {
        return usuario;
    } else {
        throw { id: 404, msg: "Usuário não encontrado!" };
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
};
