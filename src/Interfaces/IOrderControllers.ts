import CreateOrderController from "../UseCases/OrderUseCase/createOrder/CreateOrderController";
import GetAllOrdersController from "../UseCases/OrderUseCase/getAllOrders/GetAllOrdersController";

export default interface IOrderControllers {
  createOrder: CreateOrderController;
  getAllOrders: GetAllOrdersController;
}
