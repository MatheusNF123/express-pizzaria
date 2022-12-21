import CustomError from "../../../Error/CustomError";
import IPizza from "../../../Interfaces/IPizza";
import IValidation from "../../../Interfaces/IValidation";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class CreatePizzaService {
  constructor(
    private repository: IRepository<IPizza>,
    private validation: IValidation
  ) {}

  public async create(token: string, pizzaDTO: IPizza) {
    const { role } = Token.authToken(token);

    if (role !== "admin") throw new CustomError("Unauthorized", 401);

    this.validation.validatePizzaDTO(pizzaDTO);

    const pizza = await this.repository.findOne({ flavor: pizzaDTO.flavor });

    if (pizza) throw new CustomError("Pizza already exist", 409);

    const createdPizza = await this.repository.create(pizzaDTO);

    return createdPizza;
  }
}
