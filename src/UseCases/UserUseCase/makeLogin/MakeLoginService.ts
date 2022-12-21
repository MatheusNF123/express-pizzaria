import { IUser, ILogin, ILoginReturn } from "./../../../Interfaces/IUser";
import * as bcrypt from "bcryptjs";
import { IRepository } from "../../../Repository/IRepository";
import CustomError from "../../../Error/CustomError";
import Token from "../../../utils/GenerateToken";

export default class MakeLoginService {
  constructor(private userRepository: IRepository<IUser>) {}

  public login = async ({ email, password }: ILogin): Promise<ILoginReturn> => {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new CustomError("Incorrect email or password", 401);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new CustomError("Incorrect email or password", 401);

    const token = Token.generateToken({ id: user.id, email, role: user.role });

    user.password = undefined;

    return { ...user, token };
  };
}
