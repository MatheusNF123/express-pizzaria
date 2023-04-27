import { IOrder } from "../../../Interfaces/IOrder";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class GetAllOrdersService {
  constructor(private repository: IRepository<IOrder>) { }

  public async getOrders(token: string) {
    const user = Token.authToken(token);

    const ordersMethods = {
      admin: async () => this.repository.findAll(),
      customer: async () =>
        this.repository.findAll({
          where: { user },
        }),
    };

    const orders: IOrder[] = await ordersMethods[user.role]();

    return orders.map((order) => {
      order.user.password = undefined;
      return order;
    });
  }
}
