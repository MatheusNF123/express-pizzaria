import CustomError from "../../../Error/CustomError";
import { IOrderDTO } from "../../../Interfaces/IOrder";
import IValidation from "../../../Interfaces/IValidation";
import { IOrderRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class CreateUserService {
  constructor(
    private repository: IOrderRepository,
    private validation: IValidation
  ) {}

  public async create(token: string, orderDTO: IOrderDTO) {
    const { id } = Token.authToken(token);

    this.validation.validateOrderDTO(orderDTO);

    const user = await this.repository.user.findOne({ id });

    if (!user) throw new CustomError("User not found", 404);

    const pizzas = await Promise.all(
      orderDTO.pizzas.map(({ pizzaId }) =>
        this.repository.pizza.findOne({ id: pizzaId })
      )
    );

    const totalPrice = orderDTO.pizzas.reduce((acc, curr, i) => {
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

    const order = await this.repository.order.create({ user, totalPrice });

    await Promise.all(
      orderDTO.pizzas.map(({ size, border, quantity }, i) =>
        this.repository.ordersPizzas.create({
          order,
          pizza: pizzas[i],
          size,
          border,
          quantity,
        })
      )
    );

    return "Successful orders";
  }
}
