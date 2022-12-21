import { Repository } from "typeorm";
import OrdersPizzas from "../../Database/Entities/OrdersPizzas";
// import { IUser } from "../../Interfaces/IUser";
import AbstractTypeormRepository from "./AbstractTypeormRepository";

export default class TypeormOrdersPizzasRepository extends AbstractTypeormRepository<OrdersPizzas> {
  constructor(model: Repository<OrdersPizzas>) {
    super(model);
  }
}

// async findAllByUser(user: IUser): Promise<OrdersPizzas[]> {
//   return this._model.find({ where: { order: { user } } });
// }