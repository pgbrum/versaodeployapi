import produtoRepositoryBD from '../repository/produto_repository_bd';

interface Produto {
  id?: number;
  nome: string;
  categoria: string;
  preco: number;
}

async function listar() {
  return await produtoRepositoryBD.listar();
}

async function inserir(produto: Produto) {
  if (!produto || !produto.nome || !produto.categoria || !produto.preco) {
    throw { id: 400, msg: "Faltando dados do produto" };
  }
  try {
    return await produtoRepositoryBD.inserir(produto);
  } catch (err) {
    throw { id: 400, msg: "Produto sem dados corretos" };
  }
}

async function buscarPorId(id: number) {
  const produto = await produtoRepositoryBD.buscarPorId(id);
  if (produto) {
    return produto;
  } else {
    throw { id: 404, msg: "Produto não encontrado!" };
  }
}

async function atualizar(id: number, produto: Produto) {
  if (produto && produto.nome && produto.categoria && produto.preco) {
    const produtoAtualizado = await produtoRepositoryBD.atualizar(id, produto);
    if (produtoAtualizado) {
      return produtoAtualizado;
    } else {
      throw { id: 404, msg: "Produto não encontrado" };
    }
  } else {
    throw { id: 400, msg: "Produto sem dados corretos" };
  }
}

async function deletar(id: number) {
  const produto = await produtoRepositoryBD.deletar(id);
  if (produto) {
    return produto;
  } else {
    throw { id: 404, msg: "Produto não encontrado!" };
  }
}

export default {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
};
