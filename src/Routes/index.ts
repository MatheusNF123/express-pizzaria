import { Application } from "express";
import UseRoutes from "./User.routes";
import PizzaRoutes from "./Pizza.routes";
import OrderRoutes from "./Order.routes";
import UserUseCase from "../UseCases/UserUseCase";
import PizzaUseCase from "../UseCases/PizzaUseCase";
import OrderUseCase from "../UseCases/OrderUseCase";

export default (app: Application) => {
  app.use(new UseRoutes(UserUseCase).routes);
  app.use(new PizzaRoutes(PizzaUseCase).routes);
  app.use(new OrderRoutes(OrderUseCase).routes);
};
