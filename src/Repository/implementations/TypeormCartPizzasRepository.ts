import { Repository } from "typeorm";
import CartPizzas from "../../Database/Entities/CartPizzas";
import AbstractTypeormRepository from "./AbstractTypeormRepository";

export default class TypeormCartPizzasRepository extends AbstractTypeormRepository<CartPizzas> {
  constructor(model: Repository<CartPizzas>) {
    super(model);
  }
}
