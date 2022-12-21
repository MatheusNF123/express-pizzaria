import { NextFunction, Request, Response } from "express";
import CreateOrderService from "./CreateOrderService";

export default class CreateOrderController {
  constructor(private service: CreateOrderService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;

    const order = await this.service.create(authorization, req.body);
    return res.status(201).json(order);
  };
}
