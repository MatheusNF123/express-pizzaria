import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";
import { IUser } from "../../../Interfaces/IUser";
import IValidation from "../../../Interfaces/IValidation";

export default class UpdateUserService {
  constructor(
    private repository: IRepository<IUser>,
    private validation: IValidation
  ) {}

  public async update(token: string, body: IUser) {
    const userPayload = Token.authToken(token);

    this.validation.validateUserUpdateDTO(body);

    const { id, ...userData } = body;

    const user = await this.repository.findOne({ id: userPayload.id });

    if (!user) throw new CustomError("User does not exist", 401);

    if (userPayload.id.toString() !== id)
      throw new CustomError("Unauthorized", 401);

    await this.repository.update(user, userData);

    return { message: "Updated user" };
  }
}
