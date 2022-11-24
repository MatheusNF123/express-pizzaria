import { Request, Response } from "express";
import GetAllPizzasService from "./GetAllPizzasService";

export default class GetAllPizzasController {
  constructor(private service: GetAllPizzasService) {}

  public getAllPizzas = async (_req: Request, res: Response): Promise<Response> => {
    const pizzas = await this.service.getAllPizzas();
    return res.status(200).json(pizzas);
  };
}
