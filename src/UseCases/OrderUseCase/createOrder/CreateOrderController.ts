import { NextFunction, Request, Response } from 'express';
import CreateOrderService from './CreateOrderService';

export default class CreateOrderController {
  constructor(private service: CreateOrderService) {
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const order = await this.service.create(req.body);
    return res.status(201).json(order);
  }
}
