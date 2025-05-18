import { Request, Response } from 'express';
import usuarioService from '../service/usuario_service';

async function listar(req: Request, res: Response): Promise<void> {
  try {
    const usuarios = await usuarioService.listar();
    res.json(usuarios);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const usuario = await usuarioService.buscarPorId(id);
    res.json(usuario);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function inserir(req: Request, res: Response): Promise<void> {
  const usuario = req.body;
  try {
    const usuarioInserido = await usuarioService.inserir(usuario);
    res.status(201).json(usuarioInserido);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const usuario = req.body;
  try {
    const usuarioAtualizado = await usuarioService.atualizar(id, usuario);
    res.json(usuarioAtualizado);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function deletar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const usuarioDeletado = await usuarioService.deletar(id);
    res.json(usuarioDeletado);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

export default {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar,
};
        