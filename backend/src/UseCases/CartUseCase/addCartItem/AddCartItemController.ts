import { Request, Response } from "express";
import AddCartItemService from "./AddCartItemService";

export default class AddCartItemController {
  constructor(private service: AddCartItemService) { }

  public add = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;

    const message = await this.service.add(authorization, req.body);

    return res.status(201).json(message);
  };
}
