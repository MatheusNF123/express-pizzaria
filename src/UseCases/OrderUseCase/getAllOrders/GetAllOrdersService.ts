import CustomError from "../../../Error/CustomError";
import { IOrder } from "../../../Interfaces/IOrder";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class GetAllOrdersService {
  constructor(private repository: IRepository<IOrder>) { }

  public async getOrders(token: string, status: string) {
    const user = Token.authToken(token);

    if (status !== 'purchased' && status !== 'pending') {
      throw new CustomError("Unexpected status", 409);
    }

    const ordersMethods = {
      admin: async () => this.repository.findAll(),
      customer: async () =>
        this.repository.findAll({
          where: { user, status },
        }),
    };

    const orders: IOrder[] = await ordersMethods[user.role]();

    return orders.map((order) => {
      order.user.password = undefined;
      return order;
    });
  }
}
