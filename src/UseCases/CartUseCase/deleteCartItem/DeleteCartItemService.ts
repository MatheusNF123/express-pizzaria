import { ICartItemRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";
import calculateTotalPrice from "../../../utils/calculateTotalPrice"
import { ISaleInfo } from "../../../Interfaces/IOrder";
import saleInfoFactory from "../../../utils/saleInfoFactory";


export default class DeleteCartItemService {
  constructor(private repository: ICartItemRepository) { }

  public async delete(token: string, cartItemId: string) {
    const { id, email } = Token.authToken(token);

    const user = await this.repository.user.findOne({ id });

    if (!user || user.email !== email) throw new CustomError("User does not exist", 401);

    const cartItem = await this.repository.cartItem.findOne({ id: cartItemId });
    if (!cartItem || cartItem.id !== cartItemId) throw new CustomError("Unexpected cart item", 401);

    await this.repository.cartItem.delete(cartItemId);

    const cart = await this.repository.cart.findOne({ id: cartItem.cart.id });
    if (!cart || cart.id !== cartItem.cart.id) throw new CustomError("Cart not found", 404);

    const { saleInfo, pizzas } = saleInfoFactory(cart);

    const totalPrice = calculateTotalPrice(saleInfo, pizzas);

    await this.repository.cart.update(cart, { totalPrice });

    return { message: "Deleted cart item" };
  }
}
