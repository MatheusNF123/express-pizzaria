import { RequestHandler, Response } from "express";
import DeleteCartItemService from "./DeleteCartItemService";

export default class DeleteCartItemController {
  constructor(private service: DeleteCartItemService) { }

  public delete: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const { cartId, cartItemId } = req.params;

    await this.service.delete(authorization, cartId, cartItemId);

    return res.sendStatus(204);
  };
}
