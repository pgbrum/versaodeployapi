const express = require('express')
const router = express.Router();
const usuarioController = require('../controller/usuario_controller')

// Rotas para usuarios
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscarPorId);
router.post('/', usuarioController.inserir);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.deletar);

module.exports = router
