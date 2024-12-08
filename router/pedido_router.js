const express = require('express')
const router = express.Router();
const pedidoController = require('../controller/pedido_controller')

router.get('/', pedidoController.listar);
router.get('/:id', pedidoController.buscarPorId);
router.post('/', pedidoController.inserir);
router.put('/:id', pedidoController.atualizar);
router.delete('/:id', pedidoController.deletar);

module.exports = router
