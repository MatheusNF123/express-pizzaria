import { RequestHandler, Response } from "express";
import DeleteUserService from "./DeleteUserService";

export default class DeleteUserController {
  constructor(private service: DeleteUserService) {}

  public delete: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const msg = await this.service.delete(authorization);

    return res.status(204).json(msg);
  };
}
