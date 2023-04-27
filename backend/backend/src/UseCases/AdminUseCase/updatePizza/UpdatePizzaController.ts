import { RequestHandler, Response } from "express";
import UpdatePizzaService from "./UpdatePizzaService";

export default class UpdatePizzaController {
  constructor(private service: UpdatePizzaService) {}

  public update: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const { body } = req
    const updatedPizza = await this.service.update(authorization, body);

    return res.status(200).json(updatedPizza);
  };
}
