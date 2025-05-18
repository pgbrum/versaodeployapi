import usuarioRepositoryBD from '../repository/usuario_repository_bd';

interface Usuario {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
}

async function listar() {
  return await usuarioRepositoryBD.listar();
}

async function inserir(usuario: Usuario) {
  if (usuario && usuario.nome && usuario.cpf && usuario.email) {
    return await usuarioRepositoryBD.inserir(usuario);
  } else {
    throw { id: 400, msg: "Usuário sem dados corretos" };
  }
}

async function buscarPorId(id: number) {
  const usuario = await usuarioRepositoryBD.buscarPorId(id);
  if (usuario) {
    return usuario;
  } else {
    throw { id: 404, msg: "Usuário não encontrado!" };
  }
}

async function atualizar(id: number, usuario: Usuario) {
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

async function deletar(id: number) {
  const usuario = await usuarioRepositoryBD.deletar(id);
  if (usuario) {
    return usuario;
  } else {
    throw { id: 404, msg: "Usuário não encontrado!" };
  }
}

export default {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
};
