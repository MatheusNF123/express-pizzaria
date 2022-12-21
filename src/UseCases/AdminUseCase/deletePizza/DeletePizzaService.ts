import CustomError from "../../../Error/CustomError";
import IPizza from "../../../Interfaces/IPizza";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class DeletePizzaService {
  constructor(private repository: IRepository<IPizza>) {}

  public async delete(token: string, id: string) {
    const { role } = Token.authToken(token);

    if (role !== "admin") throw new CustomError("Unauthorized", 401);

    const pizza = await this.repository.findOne({ id });

    if (!pizza) throw new CustomError("Pizza does not exist", 401);

    await this.repository.delete(id);

    return { message: "Deleted pizza" };
  }
}
