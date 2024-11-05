const pedidoService = require('../service/pedido_service');

// Funções do Controller
const listar = (req, res) => {
  try {
    const pedidos = pedidoService.listar();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar pedidos', details: err });
  }
};

const buscarPorId = (req, res) => {
  const id = +req.params.id;
  try {
    const pedido = pedidoService.buscarPorId(id);
    res.json(pedido);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const inserir = (req, res) => {
  const pedido = req.body;
  try {
    const pedidoInserido = pedidoService.inserir(pedido);
    res.status(201).json(pedidoInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const atualizar = (req, res) => {
  const id = +req.params.id;
  const pedido = req.body;
  try {
    const pedidoAtualizado = pedidoService.atualizar(id, pedido);
    res.json(pedidoAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const deletar = (req, res) => {
  const id = +req.params.id;
  try {
    const pedidoDeletado = pedidoService.deletar(id);
    res.json(pedidoDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar
};
