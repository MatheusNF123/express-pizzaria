import CustomError from "../../../Error/CustomError";
import IPizza from "../../../Interfaces/IPizza";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class GetAllPizzasService {
  constructor(private repository: IRepository<IPizza>) { }

  public async getAll(token: string): Promise<IPizza[]> {
    const { role } = Token.authToken(token);

    if (role !== "admin") throw new CustomError("Não autorizado", 401);

    const pizzas = await this.repository.findAll();

    return pizzas;
  }
}

