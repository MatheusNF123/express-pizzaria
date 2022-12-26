import CustomError from "../../../Error/CustomError";
import Token from "../../../utils/GenerateToken";
import { IUser } from "./../../../Interfaces/IUser";
import { IRepository } from "./../../../Repository/IRepository";
export default class GetAllUsersService {
  constructor(private repository: IRepository<IUser>) {}

  async getAll(token: string) {
    const { role } = Token.authToken(token);

    if (role !== "admin") throw new CustomError("Unauthorized", 401);
    const users = await this.repository.findAll({
      where: { role: "customer" },
    });

    return users;
  }
}
