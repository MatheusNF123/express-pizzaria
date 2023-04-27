import { Request, Response } from "express";
import CreateCartService from "./CreateCartService";

export default class CreateCartController {
  constructor(private service: CreateCartService) { }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;

    const cart = await this.service.create(authorization, req.body);
    return res.status(201).json(cart);
  };
}
