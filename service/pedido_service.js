const pedidoRepository = require('../repository/pedido_repository')
const usuarioRepository = require('../repository/usuario_repository')
const produtoRepository = require('../repository/produto_repository')

function obterDataAtual() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0'); // Obtém o dia
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Obtém o mês (os meses começam em 0)
  const ano = hoje.getFullYear(); // Obtém o ano

  return `${dia}/${mes}/${ano}`;
}

const dataAtual = obterDataAtual();

function listar() {
  return pedidoRepository.listar();
}

function inserir(pedido) {
  if (pedido && pedido.idUsuario && pedido.idProduto) {
    const usuarioExiste = usuarioRepository.buscarPorId(pedido.idUsuario);
    const produtoExiste = produtoRepository.buscarPorId(pedido.idProduto);

    if (usuarioExiste && produtoExiste) {
      pedido.nomeProduto = produtoExiste.nome;
      pedido.nomeUsuario = usuarioExiste.nome;
      pedido.dataPedido = dataAtual;
    } else {
      throw { id: 404, msg: "Usuário ou produto com dados incorretos" };
    }
  } else {
    throw { id: 400, msg: "Pedido sem dados corretos" };
  }

  return pedidoRepository.inserir(pedido);
}

function buscarPorId(id) {
  const pedido = pedidoRepository.buscarPorId(id);
  if (!pedido) {
    throw { id: 404, msg: "Pedido não encontrado!" }
  }
  return pedido;
}

function atualizar(id, pedido) {
  // Verifica se os dados essenciais foram fornecidos
  if (!pedido || !pedido.idUsuario || !pedido.idProduto) {
    throw { id: 400, msg: "Pedido com dados inválidos." };
  }

  // Verifica se o usuário e produto existem
  const usuarioExiste = usuarioRepository.buscarPorId(pedido.idUsuario);
  const produtoExiste = produtoRepository.buscarPorId(pedido.idProduto);

  if (!usuarioExiste || !produtoExiste) {
    throw { id: 404, msg: "Usuário ou produto não encontrado!" };
  }

  // Busca o pedido atual no repositório
  const pedidoAtual = pedidoRepository.buscarPorId(id);
  if (!pedidoAtual) {
    throw { id: 404, msg: "Pedido não encontrado!" };
  }

  // Atualiza os dados do pedido
  const pedidoAtualizado = {
    ...pedidoAtual,
    idUsuario: pedido.idUsuario,
    idProduto: pedido.idProduto,
    nomeUsuario: usuarioExiste.nome,
    nomeProduto: produtoExiste.nome,
  };

  // Atualiza o pedido no repositório
  return pedidoRepository.atualizar(id, pedidoAtualizado);
}

function deletar(id) {
  const pedido = pedidoRepository.deletar(id);
  if (!pedido) {
    throw { id: 404, msg: "Pedido não encontrado!" };
  }
  return pedido;
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar
};
