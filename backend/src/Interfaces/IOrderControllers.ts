import CreateOrderController from "../UseCases/OrderUseCase/createOrder/CreateOrderController";
import GetAllOrdersController from "../UseCases/OrderUseCase/getAllOrders/GetAllOrdersController";
import CancelOrderController from "../UseCases/OrderUseCase/cancelOrder/CancelOrderController";

export default interface IOrderControllers {
  createOrder: CreateOrderController;
  getAllOrders: GetAllOrdersController;
  cancelOrder: CancelOrderController;
}
