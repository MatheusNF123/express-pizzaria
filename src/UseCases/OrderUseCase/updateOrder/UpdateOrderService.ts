import CustomError from "../../../Error/CustomError";
import { IOrder } from "../../../Interfaces/IOrder";
import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";

export default class UpdateOrderService {
  constructor(private repository: IRepository<IOrder>) { }

  public async checkout(token: string, id: string, orderDetails: ) {
    const user = Token.authToken(token);

    const order = await this.repository.findOne({ id });
    
    if (!order || order.status === "purchased" || order.user.id !== user.id) {
      throw new CustomError("Unexpected order", 409);
    }

    await this.repository.update(order, { status: "purchased", date: new Date() });

    return { message: "Updated order" }
  }
}
