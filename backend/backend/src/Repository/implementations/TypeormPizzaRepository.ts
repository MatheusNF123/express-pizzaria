import { Repository } from "typeorm";
import Pizza from "../../Database/Entities/Pizza";
import AbstractTypeormRepository from "./AbstractTypeormRepository";

export default class TypeormPizzaRepository extends AbstractTypeormRepository<Pizza> {
  constructor(model: Repository<Pizza>) {
    super(model);
  }
}
