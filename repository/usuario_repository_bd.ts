import { Client } from 'pg';

interface Usuario {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
}

const config = {
  user: 'api_bd',
  password: '123456',
  host: 'localhost',
  port: 5432,
  database: 'API',
};

async function listar(): Promise<Usuario[]> {
  const cliente = new Client(config);
  await cliente.connect();
  const sql = 'SELECT * FROM usuarios ORDER BY id';
  const res = await cliente.query(sql);
  await cliente.end();
  return res.rows;
}

async function inserir(usuario: Usuario): Promise<Usuario | undefined> {
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

async function buscarPorId(id: number): Promise<Usuario | undefined> {
  const cliente = new Client(config);
  await cliente.connect();
  const sql = 'SELECT * FROM usuarios WHERE id=$1';
  const valores = [id];
  const res = await cliente.query(sql, valores);
  await cliente.end();
  return res.rows[0];
}

async function atualizar(id: number, usuario: Usuario): Promise<Usuario | undefined> {
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

async function deletar(id: number): Promise<Usuario | undefined> {
  const cliente = new Client(config);
  await cliente.connect();
  const sql = 'DELETE FROM usuarios WHERE id=$1 RETURNING *';
  const valores = [id];
  const res = await cliente.query(sql, valores);
  await cliente.end();
  return res.rows[0];
}

export default{
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
};
