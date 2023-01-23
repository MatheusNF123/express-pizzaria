import { IUser } from "./../../../Interfaces/IUser";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";

export default class DeleteUserService {
  constructor(private repository: IRepository<IUser>) { }

  public async delete(token: string) {
    const { id } = Token.authToken(token);

    const user = await this.repository.findOne({ id });

    if (!user || user.id !== id) throw new CustomError("Usuário não existe", 401);

    await this.repository.delete(id);

    return { message: "Usuário deletado" };
  }
}
