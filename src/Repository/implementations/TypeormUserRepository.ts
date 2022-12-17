import { Repository } from "typeorm";
import User from "../../Database/Entities/User";
import { IUser } from "../../Interfaces/IUser";
import { IUserRepository } from "../IRepository";
import AbstractTypeormRepository from "./AbstractTypeormRepository";

// const mode = AppDataSource.getMongoRepository(User)

export default class TypeormUserRepository
  extends AbstractTypeormRepository<User>
  implements IUserRepository<User>
{
  constructor(model: Repository<User>) {
    super(model);
  }

  async findEmail(email: string): Promise<IUser | null> {
    return this._model.findOne({ where: { email } });
  }

  async findByEmailOrPhone(
    email: string,
    phone: string
  ): Promise<IUser | null> {
    return this._model.findOne({ where: [{ email }, { phone }] });
  }
}
