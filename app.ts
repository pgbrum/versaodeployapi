import express, { Request, Response } from 'express';
import produtoRouter from './router/produto_router';
import pedidoRouter from './router/pedido_router';
import usuarioRouter from './router/usuario_router';

const app = express();
const PORT: number = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

app.use('/api/produtos', produtoRouter);
app.use('/api/pedidos', pedidoRouter);
app.use('/api/usuarios', usuarioRouter);

// Inicializa o servidor
app.listen(PORT, (): void => {
  console.log(`Servidor executando na porta ${PORT}`);
});

export { app };
