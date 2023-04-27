import { Router } from "express";
import IUserControllers from "../Interfaces/IUserControllers";

export default class UseRoutes {
  readonly routes: Router;
  private controllers: IUserControllers;

  constructor(userController: IUserControllers) {
    this.routes = Router();
    this.controllers = userController;
    this.config();
  }

  private config(): void {
    this.routes.route("/login").post(this.controllers.makeLogin.login);

    this.routes.route("/register").post(this.controllers.createUser.create);

    this.routes.route("/update").put(this.controllers.updateUser.update);

    this.routes.route("/delete").delete(this.controllers.deleteUser.delete);

    this.routes.route("/user").get(this.controllers.getUser.get);
  }
}
