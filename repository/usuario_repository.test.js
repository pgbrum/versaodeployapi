const usuarioRepository = require("./usuario_repository_bd");
const request = require('supertest');
const { app } = require('../app.js');

describe('Rotas de usuario', () => {

    test('Quando inserir o usuario, deve retornar e conter na lista o usuario inserido', async () => {
        const usuarioInseridoEsperado = {
            nome: "Alfi",
            cpf: "123",
            email: "alfi@email"
        };

        const response = await request(app)
            .post('/usuarios')
            .send(usuarioInseridoEsperado)
            .expect(201);

        const usuarios = await usuarioRepository.listar();
        const usuarioCriado = usuarios.find(user => user.cpf === "123" && user.email === "alfi@email");

        expect(usuarioCriado).toBeDefined();
        expect(usuarioCriado.nome).toBe(usuarioInseridoEsperado.nome);
    });

    test('Quando inserir o usuario sem email, não deve retornar e não insere na lista', async () => {
        const usuarioInseridoErrado = {
            nome: "jonas",
            cpf: "456"
        };

        const response = await request(app)
            .post('/usuarios')
            .send(usuarioInseridoErrado)
            .expect(400);

        const usuarios = await usuarioRepository.listar();
        const usuarioExistente = usuarios.find(user => user.cpf === "456");
        expect(usuarioExistente).toBeUndefined();
    });

    test('Quando deletar um usuario com id inexistente, deve retornar 404', async () => {
        const usuarioId = 1000; // Id que não existe no banco
        const response = await request(app)
            .delete(`/usuarios/${usuarioId}`)
            .expect(404);
    });

    test('Quando deletar um usuario com id existente, deve retornar statuscode 200', async () => {
        const usuario = await request(app)
            .post('/usuarios')
            .send({
                nome: "Lucas",
                cpf: "789",
                email: "lucas@email"
            })
            .expect(201);

        const usuarioId = usuario.body.id;

        await request(app)
            .delete(`/usuarios/${usuarioId}`)
            .expect(200);

        const usuarios = await usuarioRepository.listar();
        const usuarioDeletado = usuarios.find(user => user.id === usuarioId);
        expect(usuarioDeletado).toBeUndefined();
    });

    test('Quando buscar por id inexistente, deve retornar 404', async () => {
        const usuarioId = 1000;
        await request(app)
            .get(`/usuarios/${usuarioId}`)
            .expect(404);
    });

    test('Quando buscar por um id existente, deve retornar o dado corretamente', async () => {
        const usuario = await request(app)
            .post('/usuarios')
            .send({
                nome: "Jonas",
                cpf: "123456",
                email: "jonas@email"
            })
            .expect(201);

        const usuarioId = usuario.body.id;

        const response = await request(app)
            .get(`/usuarios/${usuarioId}`)
            .expect(200);

        expect(response.body.id).toBe(usuarioId);
        expect(response.body.nome).toBe("Jonas");
    });

    test('Quando atualizar um usuario existente, deve retornar o usuario atualizado', async () => {
        const usuarioInserido = await request(app)
            .post('/usuarios')
            .send({
                nome: "Paulino",
                cpf: "789",
                email: "paulino@email"
            })
            .expect(201);

        const usuarioId = usuarioInserido.body.id;

        const usuarioAtualizado = {
            nome: "Paulo",
            cpf: "789",
            email: "paulo@email"
        };

        const response = await request(app)
            .put(`/usuarios/${usuarioId}`)
            .send(usuarioAtualizado)
            .expect(200);

        expect(response.body.id).toBe(usuarioId);
        expect(response.body.nome).toBe(usuarioAtualizado.nome);
        expect(response.body.email).toBe(usuarioAtualizado.email);
    });

    test('Quando atualizar um usuario com id inexistente, deve retornar 404', async () => {
        const usuarioAtualizado = {
            nome: "Carlos",
            cpf: "111",
            email: "vou@gmail"
        };

        await request(app)
            .put('/usuarios/9999')
            .send(usuarioAtualizado)
            .expect(404);
    });
});
