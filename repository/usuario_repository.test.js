const usuarioRepository = require("./usuario_repository.js");
const request = require('supertest');
const { app } = require('../app.js');




describe('Rotas de usuario', () => {

   test('Quando inserir o usuario, deve retornar e conter na lista o usuario com id=1', async () => {
       const usuarioInseridoEsperado = {
           id: 1,
           nome: "Alfi",
           cpf: 123,
           email: "tetas@email"
       };
       
       const response = await request(app)
           .post('/usuarios')
           .send(usuarioInseridoEsperado)
           .expect(201);

       const usuarios = await usuarioRepository.listar();
       expect(usuarios).toContainEqual(usuarioInseridoEsperado);
   });

   // Cenário de exceção
   test('Quando inserir o usuario sem email, não deve retornar e não insere na lista', async () => {
       const usuarioInseridoErrado = {
           id: 2,
           nome: "jonas",
           cpf: 456
       };

       const response = await request(app)
           .post('/usuarios')
           .send(usuarioInseridoErrado)
           .expect(400);

       const usuarios = await usuarioRepository.listar();
       expect(usuarios).not.toContainEqual(usuarioInseridoErrado);
   });

   test('Quando deletar um usuario com id inexistente, deve retornar 404', async () => {
    const usuarioId = 10;
    const response = await request(app)
        .delete(`/usuarios/${usuarioId}`)
        .expect(404);
});

   test('Quando deletar um usuario com id existente, deve retornar statuscode 200', async () => {
       await request(app)
           .post('/usuarios')
           .send({
               nome: "Lucas",
               cpf: 789,
               email: "pauduro@email",
               id: 1
           })
           .expect(201);

       const usuarioId = 1; // ID do usuario inserido

       await request(app)
           .delete(`/usuarios/${usuarioId}`)
           .expect(200);
   });

   test('Quando buscar por id inexistente, deve retornar 404', async () => {
       const usuarioId = 1000;
       await request(app)
           .get(`/usuarios/${usuarioId}`)
           .expect(404);
   });

   test('Quando buscar por um id existente, deve retornar o dado corretamente', async () => {
       const usuarioId = 2;
       await request(app)
           .get(`/usuarios/${usuarioId}`)
           .expect(200);
   });

   test('Quando atualizar um usuario existente, deve retornar o usuario atualizado', async () => {
       const usuarioAtualizado = {
           nome: "Paulino",
           cpf: 789,
           email: "xotilda@email"
       };

       const response = await request(app)
           .put('/usuarios/2')
           .send(usuarioAtualizado)
           .expect(200);

       const usuarioAtual = await usuarioRepository.listar();
       expect(usuarioAtual).toContainEqual({
           id: 2,
           ...usuarioAtualizado
       });
   });

   test('Quando atualizar um usuario com id inexistente, deve retornar 404', async () => {
       const usuarioAtualizado = {
           nome: "Carlos",
           cpf: 111,
           email: "vou@gmail"
       };

       await request(app)
           .put('/usuarios/9999')
           .send(usuarioAtualizado)
           .expect(404);
   });
});
