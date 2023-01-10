import { IDeleteOrderRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";

export default class DeleteOrderService {
  constructor(private repository: IDeleteOrderRepository) { }

  public async delete(token: string, orderId: string) {
    const { id, email } = Token.authToken(token);

    const user = await this.repository.user.findOne({ id });

    if (!user || user.email !== email) throw new CustomError("User does not exist", 401);

    const order = await this.repository.order.findOne({ id: orderId });
    if (!order || order.status !== 'pending') throw new CustomError("Unexpected order", 401);

    await this.repository.order.delete(orderId);

    return { message: "Deleted user" };
  }
}
