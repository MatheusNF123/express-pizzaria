import { ICancelOrderRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";
import generateDate from "../../../utils/genereteDate";

export default class CancelOrderService {
  constructor(private repository: ICancelOrderRepository) { }

  public async cancel(token: string, orderId: string) {
    const { id, email } = Token.authToken(token);

    const user = await this.repository.user.findOne({ id });

    if (!user || user.email !== email) throw new CustomError("User does not exist", 401);

    const order = await this.repository.order.findOne({ id: orderId });

    if (!order || order.status === 'cancelled') throw new CustomError("Unexpected order", 401);

    const maxMinutesToCancel = 1000 * 300;
    const orderDate = new Date(order.date).getTime() + maxMinutesToCancel;

    const date = generateDate();
    console.log(new Date(order.date));
    console.log(new Date(date));    

    if (new Date(date).getTime() > orderDate) throw new CustomError("Unable to cancel order after 5 minutes", 401);

    // await this.repository.order.update(order, { status: 'cancelled' });

    return { message: "Order cancelled" };
  }
}
