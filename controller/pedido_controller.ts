import { Request, Response } from 'express';
import pedidoService from '../service/pedido_service';

async function listar(req: Request, res: Response): Promise<void> {
  try {
    const pedidos = await pedidoService.listar();
    res.json(pedidos);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const pedido = await pedidoService.buscarPorId(id);
    res.json(pedido);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function inserir(req: Request, res: Response): Promise<void> {
  const pedido = req.body;
  try {
    const pedidoInserido = await pedidoService.inserir(pedido);
    res.status(201).json(pedidoInserido);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function atualizar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const pedido = req.body;
  try {
    const pedidoAtualizado = await pedidoService.atualizar(id, pedido);
    res.json(pedidoAtualizado);
  } catch (err: any) {
    res.status(err.id || 500).json(err);
  }
}

async function deletar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const pedidoDeletado = await pedidoService.deletar(id);
    res.json(pedidoDeletado);
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
