const usuarioService = require('../service/usuario_service');

// Funções do Controller
const listar = (req, res) => {
  res.json(usuarioService.listar());
};

const buscarPorId = (req, res) => {
  const id = +req.params.id;
  try {
    res.json(usuarioService.buscarPorId(id));
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const inserir = (req, res) => {
  const usuario = req.body;
  try {
    const usuarioInserido = usuarioService.inserir(usuario);
    res.status(201).json(usuarioInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const atualizar = (req, res) => {
  const id = +req.params.id;
  const usuario = req.body;
  try {
    const usuarioAtualizado = usuarioService.atualizar(id, usuario);
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

const deletar = (req, res) => {
  const id = +req.params.id;
  try {
    res.json(usuarioService.deletar(id));
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
