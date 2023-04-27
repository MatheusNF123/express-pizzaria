import { Repository } from "typeorm";
import Cart from "../../Database/Entities/Cart";
import AbstractTypeormRepository from "./AbstractTypeormRepository";


export default class TypeormCartRepository extends AbstractTypeormRepository<Cart> {
  constructor(model: Repository<Cart>) {
    super(model);
  }
}
