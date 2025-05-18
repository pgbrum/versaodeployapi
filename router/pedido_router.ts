import express from 'express';
import pedidoController from '../controller/pedido_controller';

const router = express.Router();

router.get('/', pedidoController.listar);
router.get('/:id', pedidoController.buscarPorId);
router.post('/', pedidoController.inserir);
router.put('/:id', pedidoController.atualizar);
router.delete('/:id', pedidoController.deletar);

export default router;
