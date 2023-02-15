import CustomError from "../../../Error/CustomError";
import { IUser } from "../../../Interfaces/IUser";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class GetUserService {
  constructor(private repository: IRepository<IUser>) { }

  public async get(token: string): Promise<IUser> {
    const { id } = Token.authToken(token);

    const user = await this.repository.findOne({ id });
    if (!user || user.id !== id) throw new CustomError("Usuário não encontrado", 404);

    user.password = undefined;

    return user;
  }
}
