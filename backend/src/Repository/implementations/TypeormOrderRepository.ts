import { Repository } from "typeorm";
import Order from "../../Database/Entities/Order";
import AbstractTypeormRepository from "./AbstractTypeormRepository";


export default class TypeormOrderRepository extends AbstractTypeormRepository<Order> {
  constructor(model: Repository<Order>) {
    super(model);
  }
}
