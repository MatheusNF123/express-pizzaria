import { Request, Response } from "express";
import GetCartService from "./GetCartService";

export default class GetCartController {
  constructor(private service: GetCartService) { }

  public get = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;

    const orders = await this.service.get(authorization);
    return res.status(200).json(orders);
  };
}
