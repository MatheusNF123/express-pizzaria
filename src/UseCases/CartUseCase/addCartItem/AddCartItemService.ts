import CustomError from "../../../Error/CustomError";
import { ICartItemDTO } from "../../../Interfaces/ICart";
import IValidation from "../../../Interfaces/IValidation";
import { ICartRepository } from "../../../Repository/IRepository";
import calculateTotalPrice from "../../../utils/calculateTotalPrice";
import Token from "../../../utils/GenerateToken";
import saleInfoFactory from "../../../utils/saleInfoFactory";

export default class AddCartItemService {
  constructor(
    private repository: ICartRepository,
    private validation: IValidation
  ) { }

  public async add(token: string, cartItemDTO: ICartItemDTO) {

    const { id, email } = Token.authToken(token);

    this.validation.validateCartItemDTO(cartItemDTO);

    const { cartId, item: { pizzaId, ...itemInfo } } = cartItemDTO;

    const user = await this.repository.user.findOne({ id });
    if (!user || user.email !== email) throw new CustomError("User not found", 404);

    const cart = await this.repository.cart.findOne({ id: cartId });
    if (!cart || cart.id !== cartId) throw new CustomError("Cart not found", 404);

    const pizza = await this.repository.pizza.findOne({ id: pizzaId });
    if (!pizza || pizza.id !== pizzaId) throw new CustomError("Pizza not found", 404);

    const { saleInfo, pizzas } = saleInfoFactory(cart);

    const totalPrice = calculateTotalPrice([...saleInfo, itemInfo], [...pizzas, pizza]);

    await this.repository.cart.update(cart, { totalPrice });

    await this.repository.cartPizzas.create({ cart, pizza, ...itemInfo });

    return "Cart item successfully added";
  }
}
