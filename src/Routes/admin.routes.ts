import { Router } from "express";
import IAdminControllers from "../Interfaces/IAdminControllers";

export default class PizzaRoutes {
  readonly routes: Router;
  private adminControllers: IAdminControllers;

  constructor(adminControllers: IAdminControllers) {
    this.routes = Router();
    this.adminControllers = adminControllers;
    this.config();
  }

  private config(): void {
    this.routes
      .route("/admin/user/:id")
      .delete(this.adminControllers.deleteUser.delete);

    this.routes
      .route("/admin/user")
      .get(this.adminControllers.getAllUsers.getAll);

    this.routes
      .route("/admin/pizza/:id")
      .delete(this.adminControllers.deletePizza.delete);

    this.routes
      .route("/admin/pizza")
      .post(this.adminControllers.createPizza.create)
      .put(this.adminControllers.updatePizza.update);
    
      this.routes
      .route("/admin/pizzas")
      .get(this.adminControllers.getAllPizzas.getAll);
  }
}
