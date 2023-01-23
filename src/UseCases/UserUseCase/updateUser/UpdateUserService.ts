import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";
import { IUser } from "../../../Interfaces/IUser";
import IValidation from "../../../Interfaces/IValidation";

export default class UpdateUserService {
  constructor(
    private repository: IRepository<IUser>,
    private validation: IValidation
  ) { }

  public async update(token: string, body: IUser) {
    const userPayload = Token.authToken(token);

    this.validation.validateUserUpdateDTO(body);

    const { id, ...userData } = body;

    const user = await this.repository.findOne({ id: userPayload.id });

    if (!user) throw new CustomError("Usuário não existe", 401);

    if (userPayload.id !== id)
      throw new CustomError("Não autorizado", 401);

    await this.repository.update(user, userData);

    return { message: "Usuário atualizado" };
  }
}
