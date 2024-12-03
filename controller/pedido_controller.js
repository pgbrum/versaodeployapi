const pedidoService = require('../service/pedido_service');

// Funções do Controller
async function listar(req, res) {
  try {
    const pedidos = await pedidoService.listar();
    res.json(pedidos);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function buscarPorId(req, res) {
  const id = +req.params.id;
  try {
    const pedido = await pedidoService.buscarPorId(id);
    res.json(pedido);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function inserir(req, res) {
  const pedido = req.body;
  try {
    const pedidoInserido = await pedidoService.inserir(pedido);
    res.status(201).json(pedidoInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function atualizar(req, res) {
  const id = +req.params.id;
  const pedido = req.body;
  try {
    const pedidoAtualizado = await pedidoService.atualizar(id, pedido);
    res.json(pedidoAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function deletar(req, res) {
  const id = +req.params.id;
  try {
    const pedidoDeletado = await pedidoService.deletar(id);
    res.json(pedidoDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar,
};
