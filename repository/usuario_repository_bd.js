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
    const sql = 'SELECT * FROM usuarios ORDER BY id';
    const res = await cliente.query(sql);
    await cliente.end();
    return res.rows;
}

async function inserir(usuario) {
    if (!usuario || !usuario.nome || !usuario.cpf || !usuario.email) {
        return undefined;
    }
    const cliente = new Client(config);
    await cliente.connect();
    const sql = `
        INSERT INTO usuarios(nome, cpf, email) 
        VALUES ($1, $2, $3) 
        RETURNING *`;
    const valores = [usuario.nome, usuario.cpf, usuario.email];
    const res = await cliente.query(sql, valores);
    await cliente.end();
    return res.rows[0];
}

async function buscarPorId(id) {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'SELECT * FROM usuarios WHERE id=$1';
    const valores = [id];
    const res = await cliente.query(sql, valores);
    await cliente.end();
    return res.rows[0];
}

async function atualizar(id, usuario) {
    if (!usuario || !usuario.nome || !usuario.cpf || !usuario.email) {
        return undefined;
    }
    const cliente = new Client(config);
    await cliente.connect();
    const sql = `
        UPDATE usuarios 
        SET nome=$1, cpf=$2, email=$3 
        WHERE id=$4 
        RETURNING *`;
    const valores = [usuario.nome, usuario.cpf, usuario.email, id];
    const res = await cliente.query(sql, valores);
    await cliente.end();
    return res.rows[0];
}

async function deletar(id) {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = 'DELETE FROM usuarios WHERE id=$1 RETURNING *';
    const valores = [id];
    const res = await cliente.query(sql, valores);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
};
