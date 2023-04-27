import { Request, Response } from "express";
import UpdateCartItemService from "./UpdateCartItemService";

export default class UpdateCartItemController {
  constructor(private service: UpdateCartItemService) { }

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const { cartId, cartItemId } = req.params

    const message = await this.service.update(authorization, cartId, cartItemId, req.body);

    return res.status(200).json(message);
  };
}
