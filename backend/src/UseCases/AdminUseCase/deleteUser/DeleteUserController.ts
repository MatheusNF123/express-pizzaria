import { RequestHandler, Response } from "express";
import DeleteUserService from "./DeleteUserService";

export default class DeleteUserController {
  constructor(private service: DeleteUserService) {}

  public delete: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const msg = await this.service.delete(authorization, id);

    return res.status(204).json(msg);
  };
}
