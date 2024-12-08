const produtoService = require('../service/produto_service');

async function listar(req, res) {
  res.json(await produtoService.listar());
}

async function inserir (req, res){
  const produto = req.body;
  try {
    const produtoInserido = await produtoService.inserir(produto);
    res.status(201).json(produtoInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function buscarPorId (req, res){
  const id = +req.params.id;
  try {
    res.json(await produtoService.buscarPorId(id));
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function atualizar(req, res){
  const id = +req.params.id;
  const produto = req.body;
  try {
    const produtoAtualizado = await produtoService.atualizar(id, produto);
    res.json(produtoAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function deletar(req, res){
  const id = +req.params.id;
  try {
    res.json(await produtoService.deletar(id));
  } catch (err) {
    res.status(err.id).json(err);
  }
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar
}
