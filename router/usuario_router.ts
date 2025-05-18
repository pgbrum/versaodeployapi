import express from 'express';
import usuarioController from '../controller/usuario_controller';

const router = express.Router();

router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscarPorId);
router.post('/', usuarioController.inserir);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.deletar);

export default router;
