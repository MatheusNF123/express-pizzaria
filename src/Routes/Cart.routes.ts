import { Router } from "express";
import ICartControllers from "../Interfaces/ICartControllers";

export default class CartRoutes {
  readonly routes: Router;
  private cartControllers: ICartControllers;

  constructor(cartControllers: ICartControllers) {
    this.routes = Router();
    this.cartControllers = cartControllers;
    this.config();
  }

  private config(): void {
    this.routes.route("/cart")
      .post(this.cartControllers.createCart.create)
      .get(this.cartControllers.getCart.get);

    this.routes.route("/cart/:id")
      .delete(this.cartControllers.deleteCart.delete);

    this.routes.route("/cart/:cartId/item/:cartItemId")
      .delete(this.cartControllers.deleteCartItem.delete)
      .put(this.cartControllers.updateCartItem.update);

    this.routes.route("/cart/item")
      .post(this.cartControllers.addCartItem.add);
  }
}
