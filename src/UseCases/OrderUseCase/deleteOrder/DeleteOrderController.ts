import { RequestHandler, Response } from "express";
import DeleteOrderService from "./DeleteOrderService";

export default class DeleteOrderController {
  constructor(private service: DeleteOrderService) { }

  public delete: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const msg = await this.service.delete(authorization, id);

    return res.status(204).json(msg);
  };
}
