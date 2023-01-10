import CreateOrderController from "../UseCases/OrderUseCase/createOrder/CreateOrderController";
import GetAllOrdersController from "../UseCases/OrderUseCase/getAllOrders/GetAllOrdersController";
import DeleteOrderController from "../UseCases/OrderUseCase/deleteOrder/DeleteOrderController";

export default interface IOrderControllers {
  createOrder: CreateOrderController;
  getAllOrders: GetAllOrdersController;
  deleteOrder: DeleteOrderController;
}
