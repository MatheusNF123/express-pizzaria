import { RequestHandler, Response } from "express";
import CancelOrderService from "./CancelOrderService";

export default class CancelOrderController {
  constructor(private service: CancelOrderService) { }

  public cancel: RequestHandler = async (req, res): Promise<Response> => {
    const { authorization } = req.headers;
    const { id } = req.params;

    const msg = await this.service.cancel(authorization, id);

    return res.status(200).json(msg);
  };
}
