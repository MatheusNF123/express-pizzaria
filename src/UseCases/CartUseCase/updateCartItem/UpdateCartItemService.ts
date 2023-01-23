import CustomError from "../../../Error/CustomError";
import { ISaleInfo } from "../../../Interfaces/IOrder";
import IValidation from "../../../Interfaces/IValidation";
import { ICartItemRepository } from "../../../Repository/IRepository";
import calculateTotalPrice from "../../../utils/calculateTotalPrice";
import Token from "../../../utils/GenerateToken";
import saleInfoFactory from "../../../utils/saleInfoFactory";

export default class UpdateCartItemService {
  constructor(
    private repository: ICartItemRepository,
    private validation: IValidation
  ) { }

  public async update(token: string, cartId: string, cartItemId: string, cartItemDTO: ISaleInfo) {
    const { id, email } = Token.authToken(token);

    this.validation.validateUpdateCartItemDTO(cartItemDTO);

    const user = await this.repository.user.findOne({ id });
    if (!user || user.email !== email) throw new CustomError("Usuário não encontrado", 404);

    const cartItem = await this.repository.cartItem.findOne({ id: cartItemId });
    if (!cartItem || cartItem.id !== cartItemId) throw new CustomError("Item do carrinho não encontrado", 404);

    await this.repository.cartItem.update(cartItem, cartItemDTO);

    const cart = await this.repository.cart.findOne({ id: cartId });
    if (!cart || cart.id !== cartId) throw new CustomError("Carrinho não encontrado", 404);

    const { saleInfo, pizzas } = saleInfoFactory(cart);

    const totalPrice = calculateTotalPrice(saleInfo, pizzas);

    await this.repository.cart.update(cart, { totalPrice });

    return { message: "Item do carrinho atualizado com sucesso" };
  }
}
