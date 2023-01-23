import CustomError from "../../../Error/CustomError";
import { IOrderDTO } from "../../../Interfaces/IOrder";
import IValidation from "../../../Interfaces/IValidation";
import { IOrderRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import calculateTotalPrice from "../../../utils/calculateTotalPrice"
import generateDate from "../../../utils/genereteDate";

export default class CreateUserService {
  constructor(
    private repository: IOrderRepository,
    private validation: IValidation
  ) { }

  public async create(token: string, orderDTO: IOrderDTO) {
    const { cartId } = orderDTO;
    const { id } = Token.authToken(token);

    this.validation.validateOrderDTO(orderDTO);

    const user = await this.repository.user.findOne({ id });

    if (!user) throw new CustomError("Usuário não encontrado", 404);

    const cart = await this.repository.cart.findOne({ id: cartId });
    if (!cart || cart.id !== cartId) throw new CustomError("Carrinho inesperado", 401);

    const pizzas = await Promise.all(
      orderDTO.pizzas.map(({ pizzaId }) =>
        this.repository.pizza.findOne({ id: pizzaId })
      )
    );

    const totalPrice = calculateTotalPrice(orderDTO.pizzas, pizzas);
    const date = new Date(generateDate());

    const order = await this.repository.order.create({ user, totalPrice, date });

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

    await this.repository.cart.delete(cartId);

    return { message: "Compra realizada com sucesso" };
  }
}
