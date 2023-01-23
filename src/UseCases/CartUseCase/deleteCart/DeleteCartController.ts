import { RequestHandler, Response } from "express";
import DeleteCartService from "./DeleteCartService";

export default class DeleteCartController {
  constructor(private service: DeleteCartService) { }

  public delete: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const { id } = req.params;

    await this.service.delete(authorization, id);

    return res.sendStatus(204);
  };
}
