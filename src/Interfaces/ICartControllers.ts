import CreateCartController from "../UseCases/CartUseCase/createCart/CreateCartController";
import GetCartController from "../UseCases/CartUseCase/getCart/GetCartController";
import DeleteCartController from "../UseCases/CartUseCase/deleteCart/DeleteCartController";
import DeleteCartItemController from "../UseCases/CartUseCase/deleteCartItem/DeleteCartItemController";

export default interface ICartControllers {
  createCart: CreateCartController;
  getCart: GetCartController;
  deleteCart: DeleteCartController;
  deleteCartItem: DeleteCartItemController;
}
