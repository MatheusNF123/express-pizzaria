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
      .route("/admin/delete/user/:id")
      .delete(this.adminControllers.deleteUser.delete);

    this.routes
      .route("/admin/create/pizza")
      .post(this.adminControllers.createPizza.create);
  }
}
