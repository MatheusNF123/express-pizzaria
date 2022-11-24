import { Request, Response } from "express";
import GetPizzaByIdService from "./GetPizzaByIdService";

export default class GetPizzaByIdController {
  constructor(private service: GetPizzaByIdService) {}

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const pizza = await this.service.getById(id);
    return res.status(200).json(pizza);
  };
}
