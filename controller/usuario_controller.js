const usuarioService = require('../service/usuario_service');

// Funções do Controller
async function listar(req, res) {
  res.json(await usuarioService.listar());
}

async function buscarPorId(req, res) {
  const id = +req.params.id;
  try {
    res.json(await usuarioService.buscarPorId(id));
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function inserir(req, res) {
  const usuario = req.body;
  try {
    const usuarioInserido = await usuarioService.inserir(usuario);
    res.status(201).json(usuarioInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function atualizar(req, res) {
  const id = +req.params.id;
  const usuario = req.body;
  try {
    const usuarioAtualizado = await usuarioService.atualizar(id, usuario);
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function deletar(req, res) {
  const id = +req.params.id;
  try {
    res.json(await usuarioService.deletar(id));
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
