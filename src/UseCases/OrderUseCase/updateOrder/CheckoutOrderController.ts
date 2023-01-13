import { Request, Response } from "express";
import CheckoutOrderService from "./UpdateOrderService";

export default class CheckoutOrderController {
  constructor(private service: CheckoutOrderService) { }

  public checkout = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const checkoutMessage = await this.service.checkout(authorization, id);
    return res.status(200).json(checkoutMessage);
  };
}
