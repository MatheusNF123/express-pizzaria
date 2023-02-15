import { Request, Response } from "express";
import GetUserService from "./GetUserService";

export default class GetUserController {
  constructor(private service: GetUserService) { }

  public get = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const user = await this.service.get(authorization);
    return res.status(200).json(user);
  };
}
