import CustomError from "../../../Error/CustomError";
import * as bcrypt from "bcryptjs";
import { IUser } from "../../../Interfaces/IUser";
import IValidation from "../../../Interfaces/IValidation";
import { IRepository, IUserRepository } from "../../../Repository/IRepository";

export default class CreateUserService {
  constructor(
    private repository: IUserRepository<IUser>,
    private validation: IValidation
  ) {}

  public async create(userDTO: IUser) {
    this.validation.validateUserDTO(userDTO);
    const user = await this.repository.findByEmailOrPhone(
      userDTO.email,
      userDTO.phone
    );
    if (user) throw new CustomError("User already exist", 409);
    const hashPassword = await bcrypt.hash(userDTO.password, 10);
    const { id, name, email, address, phone } = await this.repository.create({
      ...userDTO,
      password: hashPassword,
    });

    return { id, name, email, address, phone };
  }
}
