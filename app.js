const express = require('express');
const produtoController = require('./controller/produto_controller');
const usuarioController = require('./controller/usuario_controller');
const pedidoController = require('./controller/pedido_controller');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rotas para Produtos
app.get('/produtos', produtoController.listar);
app.get('/produtos/:id', produtoController.buscarPorId);
app.post('/produtos', produtoController.inserir);
app.put('/produtos/:id', produtoController.atualizar);
app.delete('/produtos/:id', produtoController.deletar);

// Rotas para Usuários
app.get('/usuarios', usuarioController.listar);
app.get('/usuarios/:id', usuarioController.buscarPorId);
app.post('/usuarios', usuarioController.inserir);
app.put('/usuarios/:id', usuarioController.atualizar);
app.delete('/usuarios/:id', usuarioController.deletar);

// Rotas para Pedidos (Agora utilizando o controller correto)
app.get('/pedidos', pedidoController.listar);
app.get('/pedidos/:id', pedidoController.buscarPorId);
app.post('/pedidos', pedidoController.inserir);
app.put('/pedidos/:id', pedidoController.atualizar);
app.delete('/pedidos/:id', pedidoController.deletar);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});

module.exports = { app };
