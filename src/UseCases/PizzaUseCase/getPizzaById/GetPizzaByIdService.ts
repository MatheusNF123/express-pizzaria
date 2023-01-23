import CustomError from "../../../Error/CustomError";
import IPizza from "../../../Interfaces/IPizza";
import { IRepository } from "../../../Repository/IRepository";

export default class GetPizzaByIdService {
  constructor(private repository: IRepository<IPizza>) { }

  public async getById(id: string): Promise<IPizza> {
    const pizza = await this.repository.findOne({ id });
    if (!pizza || pizza.id !== id) throw new CustomError("Pizza não encontrada", 404);
    return pizza;
  }
}
