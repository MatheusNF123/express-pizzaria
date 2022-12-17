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
    // this.routes.route('/cars/:id')
    //   .get(this.controller.getById)
    //   .put(this.controller.update)
    //   .delete(this.controller.delete);

    this.routes.route('/login')
      .post(this.controllers.makeLogin.login)

    this.routes.route('/register')
      .post(this.controllers.createUser.create)
  }
}
