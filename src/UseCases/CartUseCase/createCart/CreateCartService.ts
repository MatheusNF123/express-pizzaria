import CustomError from "../../../Error/CustomError";
import { ICartDTO } from "../../../Interfaces/ICart";
import IValidation from "../../../Interfaces/IValidation";
import { ICartRepository } from "../../../Repository/IRepository";
import calculateTotalPrice from "../../../utils/calculateTotalPrice";
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

    if (!user || user.email !== email) throw new CustomError("Usuário não encontrado", 404);

    const { pizzaId, border, quantity, size } = cartDTO.pizzas[0];

    const pizza = await this.repository.pizza.findOne({ id: pizzaId })

    const totalPrice = calculateTotalPrice([{ border, quantity, size }], [pizza]);

    const cart = await this.repository.cart.create({ user, totalPrice });

    await this.repository.cartPizzas.create({
      cart,
      pizza,
      size,
      border,
      quantity,
    });

    return { message: "Carrinho criado com sucesso" };
  }
}
