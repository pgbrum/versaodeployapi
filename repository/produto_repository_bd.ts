import { Client } from 'pg';

interface Produto {
  id?: number;
  nome: string;
  categoria: string;
  preco: number;
}

const config = {
  user: 'api_bd',
  password: '123456',
  host: 'localhost',
  port: 5432,
  database: 'API',
};

async function listar(): Promise<Produto[]> {
  const cliente = new Client(config);
  await cliente.connect();
  const sql = 'SELECT * FROM produtos ORDER BY id';
  const res = await cliente.query(sql);
  await cliente.end();
  return res.rows;
}

async function inserir(produto: Produto): Promise<Produto> {
  const cliente = new Client(config);
  await cliente.connect();
  const res = await cliente.query(
    'INSERT INTO produtos(nome, categoria, preco) VALUES ($1, $2, $3) RETURNING *',
    [produto.nome, produto.categoria, produto.preco]
  );
  await cliente.end();
  return res.rows[0];
}

async function buscarPorId(id: number): Promise<Produto | undefined> {
  const cliente = new Client(config);
  await cliente.connect();
  const sql = 'SELECT * FROM produtos WHERE id=$1';
  const values = [id];
  const res = await cliente.query(sql, values);
  await cliente.end();
  return res.rows[0];
}

async function atualizar(id: number, produto: Produto): Promise<Produto | undefined> {
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

async function deletar(id: number): Promise<Produto | undefined> {
  const cliente = new Client(config);
  await cliente.connect();
  const sql = 'DELETE FROM produtos WHERE id=$1 RETURNING *';
  const values = [id];
  const res = await cliente.query(sql, values);
  await cliente.end();
  return res.rows[0];
}

async function deletarTodos(): Promise<void> {
  const cliente = new Client(config);
  await cliente.connect();
  const sql = 'DELETE FROM produtos';
  await cliente.query(sql);
  await cliente.end();
}

export default{
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
  deletarTodos,
};
