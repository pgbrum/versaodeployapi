import { Request, Response } from 'express';
import produtoService from '../service/produto_service';

async function listar(req: Request, res: Response): Promise<void> {
  try {
    const produtos = await produtoService.listar();
    res.json(produtos);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function inserir(req: Request, res: Response): Promise<void> {
  const produto = req.body;
  try {
    const produtoInserido = await produtoService.inserir(produto);
    res.status(201).json(produtoInserido);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const produto = await produtoService.buscarPorId(id);
    res.json(produto);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const produto = req.body;
  try {
    const produtoAtualizado = await produtoService.atualizar(id, produto);
    res.json(produtoAtualizado);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function deletar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const produtoDeletado = await produtoService.deletar(id);
    res.json(produtoDeletado);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

export default {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
};
