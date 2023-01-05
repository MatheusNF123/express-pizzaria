import MakeLoginService from "./MakeLoginService";
import { Request, Response } from "express";

export default class MakeLoginController {
  private _makeLoginService: MakeLoginService;

  constructor(makeLoginService: MakeLoginService) {
    this._makeLoginService = makeLoginService;
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    console.log(req.body);
    
    const user = await this._makeLoginService.login({ email, password });

    return res.status(200).json(user);
  };
}
