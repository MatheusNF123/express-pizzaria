import { RequestHandler, Response } from "express";
import DeletePizzaService from "./DeletePizzaService";

export default class DeletePizzaController {
  constructor(private service: DeletePizzaService) {}

  public delete: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const { id } = req.params;
    await this.service.delete(authorization, id);

    return res.sendStatus(204);
  };
}
