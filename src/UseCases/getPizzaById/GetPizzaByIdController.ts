import { Request, Response } from 'express';
import GetPizzaByIdService from './GetPizzaByIdService';

export default class GetPizzaByIdController {
  constructor(private service: GetPizzaByIdService) { }

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const pizza = await this.service.getById(req.body);
    return res.status(200).json(pizza);
  }
}
