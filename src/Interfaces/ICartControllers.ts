import CreateCartController from "../UseCases/CartUseCase/createCart/CreateCartController";
import GetCartController from "../UseCases/CartUseCase/getCart/GetCartController";
import DeleteCartController from "../UseCases/CartUseCase/deleteCart/DeleteCartController";
import DeleteCartItemController from "../UseCases/CartUseCase/deleteCartItem/DeleteCartItemController";
import AddCartItemController from "../UseCases/CartUseCase/addCartItem/AddCartItemController";
import UpdateCartItemController from "../UseCases/CartUseCase/updateCartItem/UpdateCartItemController";

export default interface ICartControllers {
  createCart: CreateCartController;
  getCart: GetCartController;
  deleteCart: DeleteCartController;
  deleteCartItem: DeleteCartItemController;
  addCartItem: AddCartItemController;
  updateCartItem: UpdateCartItemController;
}
