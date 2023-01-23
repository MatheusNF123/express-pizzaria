import { ICancelOrderRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";
import generateDate from "../../../utils/genereteDate";

export default class CancelOrderService {
  constructor(private repository: ICancelOrderRepository) { }

  public async cancel(token: string, orderId: string) {
    const { id, email } = Token.authToken(token);

    const user = await this.repository.user.findOne({ id });

    if (!user || user.email !== email) throw new CustomError("Usuário não existe", 401);

    const order = await this.repository.order.findOne({ id: orderId });

    if (!order || order.status === 'Cancelado') throw new CustomError("Compra inesperada", 401);

    const maxMinutesToCancel = 1000 * 300;
    const orderDate = new Date(order.date).getTime() + maxMinutesToCancel;

    const date = generateDate();

    if (new Date(date).getTime() > orderDate) throw new CustomError("Não é possível cancelar o pedido após 5 minutos", 401);

    await this.repository.order.update(order, { status: 'Cancelado' });

    return { message: "Compra Cancelada" };
  }
}
