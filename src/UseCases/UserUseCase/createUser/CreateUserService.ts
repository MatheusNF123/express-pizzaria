import CustomError from "../../../Error/CustomError";
import * as bcrypt from "bcryptjs";
import IUser from "../../../Interfaces/IUser";
import IValidation from "../../../Interfaces/IValidation";
import { IRepository } from "../../../Repository/IRepository";

export default class CreateUserService {
  constructor(
    private repository: IRepository<IUser>,
    private validation: IValidation
  ) {}

  public async create(userDTO: IUser) {
    this.validation.validateUserDTO(userDTO);
    const hashPassword = await bcrypt.hash(userDTO.password, 10);
    const { id, name, email, address, phone } = await this.repository.create({
      ...userDTO,
      password: hashPassword,
    });

    return { id, name, email, address, phone };
  }
}
