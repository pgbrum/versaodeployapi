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

        // Obtendo os usuários após a inserção
        const usuarios = await usuarioRepository.listar();
        const usuarioCriado = usuarios.find(user => user.cpf === "123" && user.email === "alfi@email");

        // Verificando se o usuário inserido existe na lista
        expect(usuarioCriado).toBeDefined();
        expect(usuarioCriado.nome).toBe(usuarioInseridoEsperado.nome);
    });

    // Cenário de exceção
    test('Quando inserir o usuario sem email, não deve retornar e não insere na lista', async () => {
        const usuarioInseridoErrado = {
            nome: "jonas",
            cpf: "456"
        };

        const response = await request(app)
            .post('/usuarios')
            .send(usuarioInseridoErrado)
            .expect(400);

        // Verificando que o usuário não foi inserido
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
        // Primeiro, inserindo o usuário
        const usuario = await request(app)
            .post('/usuarios')
            .send({
                nome: "Lucas",
                cpf: "789",
                email: "lucas@email"
            })
            .expect(201);

        const usuarioId = usuario.body.id; // Obtendo o id do usuário inserido

        // Deletando o usuário
        await request(app)
            .delete(`/usuarios/${usuarioId}`)
            .expect(200);

        // Verificando que o usuário foi deletado
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
        // Inserir o usuário para testar a busca
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





// const usuarioRepository = require("./usuario_repository_bd");
// const request = require('supertest');
// const { app } = require('../app.js');
// const { Client } = require('pg');

// describe('Rotas de usuario', () => {

//    test('Quando inserir o usuario, deve retornar e conter na lista o usuario com id=1', async () => {
//        const usuarioInseridoEsperado = {
//            id: 1,
//            nome: "Alfi",
//            cpf: 123,
//            email: "alfi@email"
//        };
       
//        const response = await request(app)
//            .post('/usuarios')
//            .send(usuarioInseridoEsperado)
//            .expect(201);

//        const usuarios = await usuarioRepository.listar();
//        expect(usuarios).toContainEqual(usuarioInseridoEsperado);
//    });

//    // Cenário de exceção
//    test('Quando inserir o usuario sem email, não deve retornar e não insere na lista', async () => {
//        const usuarioInseridoErrado = {
//            id: 2,
//            nome: "jonas",
//            cpf: 456
//        };

//        const response = await request(app)
//            .post('/usuarios')
//            .send(usuarioInseridoErrado)
//            .expect(400);

//        const usuarios = await usuarioRepository.listar();
//        expect(usuarios).not.toContainEqual(usuarioInseridoErrado);
//    });

//    test('Quando deletar um usuario com id inexistente, deve retornar 404', async () => {
//     const usuarioId = 10;
//     const response = await request(app)
//         .delete(`/usuarios/${usuarioId}`)
//         .expect(404);
// });

//    test('Quando deletar um usuario com id existente, deve retornar statuscode 200', async () => {
//        await request(app)
//            .post('/usuarios')
//            .send({
//                nome: "Lucas",
//                cpf: 789,
//                email: "lucas@email",
//                id: 1
//            })
//            .expect(201);

//        const usuarioId = 1; // ID do usuario inserido

//        await request(app)
//            .delete(`/usuarios/${usuarioId}`)
//            .expect(200);
//    });

//    test('Quando buscar por id inexistente, deve retornar 404', async () => {
//        const usuarioId = 1000;
//        await request(app)
//            .get(`/usuarios/${usuarioId}`)
//            .expect(404);
//    });

//    test('Quando buscar por um id existente, deve retornar o dado corretamente', async () => {
//        const usuarioId = 2;
//        await request(app)
//            .get(`/usuarios/${usuarioId}`)
//            .expect(200);
//    });

//    test('Quando atualizar um usuario existente, deve retornar o usuario atualizado', async () => {
//        const usuarioAtualizado = {
//            nome: "Paulino",
//            cpf: 789,
//            email: "paulino@email"
//        };

//        const response = await request(app)
//            .put('/usuarios/2')
//            .send(usuarioAtualizado)
//            .expect(200);

//        const usuarioAtual = await usuarioRepository.listar();
//        expect(usuarioAtual).toContainEqual({
//            id: 2,
//            ...usuarioAtualizado
//        });
//    });

//    test('Quando atualizar um usuario com id inexistente, deve retornar 404', async () => {
//        const usuarioAtualizado = {
//            nome: "Carlos",
//            cpf: 111,
//            email: "vou@gmail"
//        };

//        await request(app)
//            .put('/usuarios/9999')
//            .send(usuarioAtualizado)
//            .expect(404);
//    });
// });
