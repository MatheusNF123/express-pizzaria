import CustomError from "../../../Error/CustomError";
import { ICart } from "../../../Interfaces/ICart";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class GetCartService {
  constructor(private repository: IRepository<ICart>) { }

  public async get(token: string) {
    const user = Token.authToken(token);

    const cart = await this.repository.findOne({ user });

    if (!cart || cart.user.id !== user.id) throw new CustomError("Unexpected cart", 409);

    cart.user.password = undefined;

    return cart;
  }
}
