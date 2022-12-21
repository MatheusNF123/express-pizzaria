import { Request, Response } from "express";
import CreatePizzaService from "./CreatePizzaService";

export default class CreatePizzaController {
  constructor(private service: CreatePizzaService) {}

  public create = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { authorization } = req.headers;

    const pizza = await this.service.create(authorization, req.body);
    return res.status(201).json(pizza);
  };
}
