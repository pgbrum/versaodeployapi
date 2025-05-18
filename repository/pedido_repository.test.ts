import request from 'supertest';
import { app } from '../app';
import { inserir as inserirUsuario } from '../repository/usuario_repository_bd';
import { inserir as inserirProduto } from '../repository/produto_repository_bd';

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
}

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
}

interface Pedido {
  id?: number;
  idUsuario: number;
  nomeUsuario: string;
  idProduto: number;
  nomeProduto: string;
  dataPedido: string;
}

let usuario: Usuario;
let produto: Produto;
let pedido: Pedido | null;

beforeAll(async () => {
  usuario = await inserirUsuario({ nome: "Usuario Teste", cpf: "12345678901", email: "usuario@teste.com" });
  produto = await inserirProduto({ nome: "Produto Teste", categoria: "Categoria Teste", preco: 100.0 });

  if (!usuario || !produto) {
    throw new Error("Falha ao inserir usuário ou produto.");
  }
});

describe('Testes de Pedido', () => {
  test('Deve inserir um novo pedido', async () => {
    const novoPedido: Pedido = {
      idUsuario: usuario.id,
      nomeUsuario: usuario.nome,
      idProduto: produto.id,
      nomeProduto: produto.nome,
      dataPedido: new Date().toISOString(),
    };

    const response = await request(app)
      .post('/pedidos')
      .send(novoPedido);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.idUsuario).toBe(usuario.id);
    expect(response.body.idProduto).toBe(produto.id);

    pedido = response.body;
  });

  test('Deve listar todos os pedidos', async () => {
    const response = await request(app).get('/pedidos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Deve buscar pedido por ID', async () => {
    if (!pedido || !pedido.id) throw new Error("Pedido não definido");

    const response = await request(app).get(`/pedidos/${pedido.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(pedido.id);
  });

  test('Deve atualizar um pedido', async () => {
    if (!pedido || !pedido.id) throw new Error("Pedido não definido");

    const pedidoAtualizado: Pedido = {
      idUsuario: usuario.id,
      nomeUsuario: usuario.nome,
      idProduto: produto.id,
      nomeProduto: produto.nome,
      dataPedido: new Date().toLocaleDateString('pt-BR'),
    };

    const response = await request(app)
      .put(`/pedidos/${pedido.id}`)
      .send(pedidoAtualizado);

    expect(response.status).toBe(200);
    expect(response.body.dataPedido).toBe(pedidoAtualizado.dataPedido);
  });

  test('Deve deletar um pedido', async () => {
    if (!pedido || !pedido.id) throw new Error("Pedido não definido");

    const response = await request(app).delete(`/pedidos/${pedido.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(pedido.id);

    pedido = null;
  });
});
