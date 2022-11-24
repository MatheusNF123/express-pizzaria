import CustomError from "../../Error/CustomError";
import IUser from "../../Interfaces/IUser";
import IValidation from "../../Interfaces/IValidation";
import { IRepository } from "../../Repository/IRepository";

export default class CreateUserService {
  constructor(private repository: IRepository<IUser>, private validation: IValidation) {
  }

  public async create(userDTO: IUser) {
    if (!this.validation.validateUserDTO(userDTO)) throw new CustomError('Invalid user', 400);
    return this.repository.create(userDTO);
  }
}