import { Application } from "express";
import UseRoutes from "./User.routes";
import PizzaRoutes from "./Pizza.routes";
import UserUseCase from "../UseCases/UserUseCase";
import PizzaUseCase from "../UseCases/PizzaUseCase";

export default (app: Application) => {
  app.use(new UseRoutes(UserUseCase).routes);
  app.use(new PizzaRoutes(PizzaUseCase).routes);
};
