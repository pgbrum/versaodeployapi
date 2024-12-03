const express = require('express');
const produtoRouter = require('./router/produto_router');
const pedidoRouter = require('./router/pedido_router');
const usuarioRouter = require('./router/usuario_router');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/produtos', produtoRouter)
app.use('/api/pedidos', pedidoRouter)
app.use('/api/usuarios', usuarioRouter)

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});

module.exports = { app };
