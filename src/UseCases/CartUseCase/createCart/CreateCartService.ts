import CustomError from "../../../Error/CustomError";
import { ICartDTO } from "../../../Interfaces/ICart";
import { IOrderDTO } from "../../../Interfaces/IOrder";
import IValidation from "../../../Interfaces/IValidation";
import { ICartRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class CreateCartService {
  constructor(
    private repository: ICartRepository,
    private validation: IValidation
  ) { }

  public async create(token: string, cartDTO: ICartDTO) {
    const { id, email } = Token.authToken(token);

    this.validation.validateCartDTO(cartDTO);

    const user = await this.repository.user.findOne({ id });

    if (!user || user.email !== email) throw new CustomError("User not found", 404);

    const pizzas = await Promise.all(
      cartDTO.pizzas.map(({ pizzaId }) =>
        this.repository.pizza.findOne({ id: pizzaId })
      )
    );

    const totalPrice = cartDTO.pizzas.reduce((acc, curr, i) => {
      let price = pizzas[i].price;

      if (curr.border) price + 10;

      switch (curr.size) {
        case "small":
          price -= 8;
          break;
        case "big":
          price += 15;
          break;
        default:
          break;
      }

      return price * curr.quantity + acc;
    }, 0);

    const cart = await this.repository.cart.create({ user, totalPrice });

    await Promise.all(
      cartDTO.pizzas.map(({ size, border, quantity }, i) =>
        this.repository.cartPizzas.create({
          cart,
          pizza: pizzas[i],
          size,
          border,
          quantity,
        })
      )
    );

    return "Successful cart";
  }
}
