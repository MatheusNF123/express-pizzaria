import DeleteUserController from "../UseCases/AdminUseCase/deleteUser/DeleteUserController";
import CreatePizzaController from "../UseCases/AdminUseCase/createPizza/CreatePizzaController";
import DeletePizzaController from "../UseCases/AdminUseCase/deletePizza/DeletePizzaController";
import UpdatePizzaController from "../UseCases/AdminUseCase/updatePizza/UpdatePizzaController";

export default interface IAdminControllers {
  deleteUser: DeleteUserController;
  createPizza: CreatePizzaController;
  deletePizza: DeletePizzaController;
  updatePizza: UpdatePizzaController;
}
