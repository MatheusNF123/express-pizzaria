import { IOrdersPizzas } from "../../../Interfaces/IOrdersPizzas";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class GetAllOrdersService {
  constructor(private repository: IRepository<IOrdersPizzas>) {}

  public async getOrders(token: string) {
    const user = Token.authToken(token);

    const orders = {
      admin: async () => this.repository.findAll(),
      customer: async () =>
        this.repository.findAll({
          where: { order: { user } },
        }),
    };

    return orders[user.role]();
  }
}
