import { Application } from "express";
import UseRoutes from "./User.routes";
import PizzaRoutes from "./Pizza.routes";
import OrderRoutes from "./Order.routes";
import AdminRoutes from "./admin.routes"
import UserUseCase from "../UseCases/UserUseCase";
import PizzaUseCase from "../UseCases/PizzaUseCase";
import OrderUseCase from "../UseCases/OrderUseCase";
import AdminUseCase from "../UseCases/AdminUseCase";

export default (app: Application) => {
  app.use(new UseRoutes(UserUseCase).routes);
  app.use(new PizzaRoutes(PizzaUseCase).routes);
  app.use(new OrderRoutes(OrderUseCase).routes);
  app.use(new AdminRoutes(AdminUseCase).routes);
};
