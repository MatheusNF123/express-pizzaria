import CustomError from "../../../Error/CustomError";
import * as bcrypt from "bcryptjs";
import { IUser } from "../../../Interfaces/IUser";
import IValidation from "../../../Interfaces/IValidation";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class CreateUserService {
  constructor(
    private repository: IRepository<IUser>,
    private validation: IValidation
  ) {}

  public async create(userDTO: IUser) {
    this.validation.validateUserDTO(userDTO);
    const user = await this.repository.findOne([
      { email: userDTO.email },
      { phone: userDTO.phone },
    ]);

    if (user) throw new CustomError("User already exist", 409);
    const hashPassword = await bcrypt.hash(userDTO.password, 10);
    const { id, name, email, address, phone, role } =
      await this.repository.create({
        ...userDTO,
        password: hashPassword,
      });

    const token = Token.generateToken({ id, email, role });

    return { id, name, email, address, phone, role, token };
  }
}
