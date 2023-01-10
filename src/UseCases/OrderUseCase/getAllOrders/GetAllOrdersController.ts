import { NextFunction, Request, Response } from "express";
import GetAllOrdersService from "./GetAllOrdersService";

export default class GetAllOrdersController {
  constructor(private service: GetAllOrdersService) {}

  public getOrders = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const { status } = req.params;
    const orders = await this.service.getOrders(authorization, status);
    return res.status(200).json(orders);
  };
}
