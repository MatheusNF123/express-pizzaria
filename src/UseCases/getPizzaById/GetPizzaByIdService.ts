import CustomError from "../../Error/CustomError";
import IPizza from "../../Interfaces/IPizza";
import IValidation from "../../Interfaces/IValidation";
import { IRepository } from "../../Repository/IRepository";

export default class GetPizzaByIdService {
  constructor(private repository: IRepository<IPizza>) {
  }

  public async getById(id: string): Promise<IPizza> {
    const pizza = await this.repository.findOne(id);
    if (!pizza) throw new CustomError('Invalid pizza', 400);
    return pizza;
  }
}