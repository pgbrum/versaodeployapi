const produtoService = require('../service/produto_service');

// Funções do Controller
const listar = (req, res) => {
  res.json(produtoService.listar());
};

const buscarPorId = (req, res) => {
  const id = +req.params.id;
  try {
    res.json(produtoService.buscarPorId(id));
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const inserir = (req, res) => {
  const produto = req.body;
  try {
    const produtoInserido = produtoService.inserir(produto);
    res.status(201).json(produtoInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const atualizar = (req, res) => {
  const id = +req.params.id;
  const produto = req.body;
  try {
    const produtoAtualizado = produtoService.atualizar(id, produto);
    res.json(produtoAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const deletar = (req, res) => {
  const id = +req.params.id;
  try {
    res.json(produtoService.deletar(id));
    res.status(204);
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
