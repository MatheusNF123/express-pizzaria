import { Repository } from "typeorm";
import User from "../../Database/Entities/User";
import AbstractTypeormRepository from "./AbstractTypeormRepository";

// const mode = AppDataSource.getMongoRepository(User)

export default class TypeormUserRepository extends AbstractTypeormRepository<User> {
  constructor(model: Repository<User>) {
    super(model);
  }

  async findEmail(email: string): Promise<User | null> {
    return this._model.findOne({where: {email} });
  }  
}