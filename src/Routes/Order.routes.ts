import { Router } from "express";
import IOrderControllers from "../Interfaces/IOrderControllers";

export default class OrderRoutes {
  readonly routes: Router;
  private orderControllers: IOrderControllers;

  constructor(orderControllers: IOrderControllers) {
    this.routes = Router();
    this.orderControllers = orderControllers;
    this.config();
  }

  private config(): void {
    this.routes.route("/order").post(this.orderControllers.createOrder.create);
    this.routes
      .route("/order")
      .get(this.orderControllers.getAllOrders.getOrders);
  }
}
