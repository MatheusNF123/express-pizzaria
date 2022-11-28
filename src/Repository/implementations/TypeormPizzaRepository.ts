import { Repository } from "typeorm";
import Pizza from "../../Database/Entities/Pizza";
import AbstractTypeormRepository from "./AbstractTypeormRepository";

// const mode = AppDataSource.getMongoRepository(Pizza)

export default class TypeormPizzaRepository extends AbstractTypeormRepository<Pizza> {
  constructor(model: Repository<Pizza>) {
    super(model);
  }
}
