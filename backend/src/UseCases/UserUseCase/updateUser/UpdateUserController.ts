import { RequestHandler, Response } from "express";
import UpdateUserService from "./UpdateUserService";

export default class UpdateUserController {
  constructor(private service: UpdateUserService) {}

  public update: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const { body } = req;
    const updatedUser = await this.service.update(authorization, body);
    return res.status(200).json(updatedUser);
  };
}
