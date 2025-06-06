import pedidoRepositoryBD from '../repository/pedido_repository_bd';
import usuarioRepositoryBD from '../repository/usuario_repository_bd';
import produtoRepositoryBD from '../repository/produto_repository_bd';

interface Pedido {
  id?: number;
  idUsuario: number;
  idProduto: number;
  nomeUsuario?: string;
  nomeProduto?: string;
  dataPedido?: string;
}

function obterDataAtual(): string {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const ano = hoje.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

const dataAtual = obterDataAtual();

async function listar() {
  return await pedidoRepositoryBD.listar();
}

async function inserir(pedido: Pedido) {
  if (pedido && pedido.idUsuario && pedido.idProduto) {
    const usuarioExiste = await usuarioRepositoryBD.buscarPorId(pedido.idUsuario);
    const produtoExiste = await produtoRepositoryBD.buscarPorId(pedido.idProduto);

    if (usuarioExiste && produtoExiste) {
      pedido.nomeProduto = produtoExiste.nome;
      pedido.nomeUsuario = usuarioExiste.nome;
      pedido.dataPedido = dataAtual;
      return await pedidoRepositoryBD.inserir(pedido);
    } else {
      throw { id: 404, msg: "Usuário ou produto com dados incorretos" };
    }
  } else {
    throw { id: 400, msg: "Pedido sem dados corretos" };
  }
}

async function buscarPorId(id: number) {
  const pedido = await pedidoRepositoryBD.buscarPorId(id);
  if (!pedido) {
    throw { id: 404, msg: "Pedido não encontrado!" };
  }
  return pedido;
}

async function atualizar(id: number, pedido: Pedido) {
  if (!pedido || !pedido.idUsuario || !pedido.idProduto) {
    throw { id: 400, msg: "Pedido com dados inválidos." };
  }

  const usuarioExiste = await usuarioRepositoryBD.buscarPorId(pedido.idUsuario);
  const produtoExiste = await produtoRepositoryBD.buscarPorId(pedido.idProduto);

  if (!usuarioExiste || !produtoExiste) {
    throw { id: 404, msg: "Usuário ou produto não encontrado!" };
  }

  const pedidoAtual = await pedidoRepositoryBD.buscarPorId(id);
  if (!pedidoAtual) {
    throw { id: 404, msg: "Pedido não encontrado!" };
  }

  const pedidoAtualizado: Pedido = {
    ...pedidoAtual,
    idUsuario: pedido.idUsuario,
    idProduto: pedido.idProduto,
    nomeUsuario: usuarioExiste.nome,
    nomeProduto: produtoExiste.nome,
  };

  return await pedidoRepositoryBD.atualizar(id, pedidoAtualizado);
}

async function deletar(id: number) {
  const pedido = await pedidoRepositoryBD.deletar(id);
  if (!pedido) {
    throw { id: 404, msg: "Pedido não encontrado!" };
  }
  return pedido;
}

export default {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
};
