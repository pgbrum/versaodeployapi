const { Client } = require('pg');

// Configuração do banco de dados
const config = {
    user: 'api_bd',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'API',
};
// Listar todos os pedidos
async function listar() {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'SELECT * FROM pedidos ORDER BY id';
    const res = await cliente.query(sql);
    await cliente.end();
    return res.rows;
}

// Inserir um novo pedido
async function inserir(pedido) {
    if (
        !pedido ||
        !pedido.idUsuario ||
        !pedido.nomeUsuario ||
        !pedido.idProduto ||
        !pedido.nomeProduto ||
        !pedido.dataPedido
    ) {
        return undefined;
    }
    const cliente = new Client(config);
    await cliente.connect();
    const sql = `
        INSERT INTO pedidos(id_usuario, nome_usuario, id_produto, nome_produto, data_pedido) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`;
    const valores = [
        pedido.idUsuario,
        pedido.nomeUsuario,
        pedido.idProduto,
        pedido.nomeProduto,
        pedido.dataPedido,
    ];
    const res = await cliente.query(sql, valores);
    await cliente.end();
    return res.rows[0];
}

// Buscar pedido por ID
async function buscarPorId(id) {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'SELECT * FROM pedidos WHERE id=$1';
    const values = [id];
    const res = await cliente.query(sql, values);
    await cliente.end();
    return res.rows[0];
}

// Atualizar um pedido
async function atualizar(id, pedidoAtualizado) {
    if (
        !pedidoAtualizado ||
        !pedidoAtualizado.idUsuario ||
        !pedidoAtualizado.nomeUsuario ||
        !pedidoAtualizado.idProduto ||
        !pedidoAtualizado.nomeProduto
    ) {
        return undefined;
    }
    const cliente = new Client(config);
    await cliente.connect();
    const sql = `
        UPDATE pedidos 
        SET id_usuario=$1, nome_usuario=$2, id_produto=$3, nome_produto=$4 
        WHERE id=$5 
        RETURNING *`;
    const valores = [
        pedidoAtualizado.idUsuario,
        pedidoAtualizado.nomeUsuario,
        pedidoAtualizado.idProduto,
        pedidoAtualizado.nomeProduto,
        id,
    ];
    const res = await cliente.query(sql, valores);
    await cliente.end();
    return res.rows[0];
}

// Deletar um pedido por ID
async function deletar(id) {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'DELETE FROM pedidos WHERE id=$1 RETURNING *';
    const values = [id];
    const res = await cliente.query(sql, values);
    await cliente.end();
    return res.rows[0];
}

// Exportação das funções
module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
};
