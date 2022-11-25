import { NextFunction, Request, Response } from 'express';
import CreateUserService from './CreateUserService';

export default class CreateUserController {
  constructor(private service: CreateUserService) {
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.service.create(req.body);
    return res.status(201).json(user);
  }
}
