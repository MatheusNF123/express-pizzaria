import { Repository } from "typeorm";
import OrdersPizzas from "../../Database/Entities/OrdersPizzas";
import AbstractTypeormRepository from "./AbstractTypeormRepository";

export default class TypeormOrdersPizzasRepository extends AbstractTypeormRepository<OrdersPizzas> {
  constructor(model: Repository<OrdersPizzas>) {
    super(model);
  }
}
