const request = require('supertest');
const { app } = require('../app');
const { inserir: inserirUsuario } = require('../repository/usuario_repository_bd');
const { inserir: inserirProduto } = require('../repository/produto_repository_bd');

let usuario;
let produto;
let pedido;

beforeAll(async () => {
    usuario = await inserirUsuario({ nome: "Usuario Teste", cpf: "12345678901", email: "usuario@teste.com" });
    produto = await inserirProduto({ nome: "Produto Teste", categoria: "Categoria Teste", preco: 100.0 });

    if (!usuario || !produto) {
        throw new Error("Falha ao inserir usuário ou produto.");
    }
});

describe('Testes de Pedido', () => {
    test('Deve inserir um novo pedido', async () => {
        const novoPedido = {
            idUsuario: usuario.id,
            nomeUsuario: usuario.nome,
            idProduto: produto.id,
            nomeProduto: produto.nome,
            dataPedido: new Date().toISOString()
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
    
        const pedidoAtualizado = {
            idUsuario: usuario.id,
            nomeUsuario: usuario.nome,
            idProduto: produto.id,
            nomeProduto: produto.nome,
            dataPedido: new Date().toLocaleDateString('pt-BR')
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
