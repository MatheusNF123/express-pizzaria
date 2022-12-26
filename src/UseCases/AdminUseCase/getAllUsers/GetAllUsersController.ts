import { Request, Response } from "express";
import GetAllUsersService from "./GetAllUsersService";

export default class GetAllUsersController {
  constructor(private service: GetAllUsersService) {}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const users = await this.service.getAll(authorization);
    return res.status(200).json(users);
  };
}
