import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";
import IPizza from "../../../Interfaces/IPizza";
import IValidation from "../../../Interfaces/IValidation";

export default class UpdatePizzaService {
  constructor(
    private repository: IRepository<IPizza>,
    private validation: IValidation
  ) { }

  public async update(token: string, body: IPizza) {
    const { role } = Token.authToken(token);

    if (role !== "admin") throw new CustomError("Não autorizado", 401);

    this.validation.validatePizzaUpdateDTO(body);

    const { id, ...pizzaData } = body;

    const pizza = await this.repository.findOne({ id });

    if (!pizza) throw new CustomError("Pizza não existe", 401);

    await this.repository.update(pizza, pizzaData);

    return { message: "Pizza atualizada" };
  }
}
