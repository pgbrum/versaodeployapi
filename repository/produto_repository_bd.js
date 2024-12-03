const { Client } = require('pg');

const config = {
    user: 'api_bd',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'API',
};

async function listar() {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'SELECT * FROM produtos ORDER BY id';
    const res = await cliente.query(sql);
    await cliente.end();
    return res.rows;
}

async function inserir(produto) {
    const cliente = new Client(config);
    await cliente.connect();
    // const sql = 'INSERT INTO produtos(nome, categoria, preco) VALUES ($1, $2, $3) RETURNING *';
    // const valores = [produto.nome, produto.categoria, produto.preco];
    // const res = await cliente.query(sql, valores);
    const res = await cliente.query('INSERT INTO produtos(nome, categoria, preco) VALUES ($1, $2, $3) RETURNING *',[produto.nome, produto.categoria, produto.preco])
    await cliente.end();
    return res.rows[0];
}



async function buscarPorId(id) {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'SELECT * FROM produtos WHERE id=$1';
    const values = [id];
    const res = await cliente.query(sql, values);
    await cliente.end();
    return res.rows[0];
}

async function atualizar(id, produto) {
    if (!produto || !produto.nome || !produto.categoria || !produto.preco) {
        return undefined;
    }
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'UPDATE produtos SET nome=$1, categoria=$2, preco=$3 WHERE id=$4 RETURNING *';
    const values = [produto.nome, produto.categoria, produto.preco, id];
    const res = await cliente.query(sql, values);
    await cliente.end();
    return res.rows[0];
}

async function deletar(id) {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'DELETE FROM produtos WHERE id=$1 RETURNING *';
    const values = [id];
    const res = await cliente.query(sql, values);
    await cliente.end();
    return res.rows[0];
}

async function deletarTodos() {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'DELETE FROM produtos';
    await cliente.query(sql);
    await cliente.end();
}

// Exportação das funções
module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    deletarTodos,
};
