import CustomError from "../../../Error/CustomError";
import * as bcrypt from "bcryptjs";
import { IOrder, IOrderDTO } from "../../../Interfaces/IOrder";
import { IUser } from "../../../Interfaces/IUser";
import IValidation from "../../../Interfaces/IValidation";
import { IOrderRepository } from "../../../Repository/IRepository";

export default class CreateUserService {
  constructor(
    private repository: IOrderRepository,
    private validation: IValidation
  ) {}

  public async create(orderDTO: IOrderDTO) {
    this.validation.validateOrderDTO(orderDTO);

    const user = await this.repository.user.findById(orderDTO.userId);
    if (!user) throw new CustomError("User not found", 404);

    const pizzas = await Promise.all(
      orderDTO.pizzas.map(({ pizzaId }) =>
        this.repository.pizza.findById(pizzaId)
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
