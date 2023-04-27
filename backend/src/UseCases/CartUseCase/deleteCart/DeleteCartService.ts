import { IDeleteCartRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";

export default class DeleteCartService {
  constructor(private repository: IDeleteCartRepository) { }

  public async delete(token: string, cartId: string) {
    const { id, email } = Token.authToken(token);

    const user = await this.repository.user.findOne({ id });

    if (!user || user.email !== email) throw new CustomError("Usuário não existe", 401);

    const cart = await this.repository.cart.findOne({ id: cartId });
    if (!cart || cart.id !== cartId) throw new CustomError("Carrinho inesperado", 401);

    await this.repository.cart.delete(cartId);

    return { message: "Carrinho deletado" };
  }
}
