import CustomError from "../../../Error/CustomError";
import IPizza from "../../../Interfaces/IPizza";
import { IRepository } from "../../../Repository/IRepository";

export default class GetAllPizzasService {
  constructor(private repository: IRepository<IPizza>) {}

  public async getAllPizzas(): Promise<IPizza[]> {
    return this.repository.findAll();
  }
}

