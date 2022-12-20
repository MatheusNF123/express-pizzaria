import CreateOrderController from "../UseCases/OrderUseCase/createOrder/CreateOrderController";

export default interface IOrderControllers {
  createOrder: CreateOrderController;
}
