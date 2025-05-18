import express from 'express';
import produtoController from '../controller/produto_controller';

const router = express.Router();

router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorId);
router.post('/', produtoController.inserir);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

export default router;
