import { Request, Response } from "express";
import GetAllPizzasService from "./GetAllPizzasService";

export default class GetAllPizzasController {
  constructor(private service: GetAllPizzasService) { }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;

    const pizzas = await this.service.getAll(authorization);

    return res.status(200).json(pizzas);
  };
}
