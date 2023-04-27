import { Router } from "express";
import IPizzaControllers from "../Interfaces/IPizzaControllers";

export default class PizzaRoutes {
  readonly routes: Router;
  private pizzaControllers: IPizzaControllers;

  constructor(pizzaControllers: IPizzaControllers) {
    this.routes = Router();
    this.pizzaControllers = pizzaControllers;
    this.config();
  }

  private config(): void {
    this.routes.route("/pizzas/:id")
      .get(this.pizzaControllers.getPizzaById.getById);

    this.routes.route("/pizzas")
      .get(this.pizzaControllers.getAllPizzas.getAllPizzas);
  }
}
