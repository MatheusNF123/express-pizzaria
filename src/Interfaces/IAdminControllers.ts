import DeleteUserController from "../UseCases/AdminUseCase/deleteUser/DeleteUserController";
import CreatePizzaController from "../UseCases/AdminUseCase/createPizza/CreatePizzaController";

export default interface IAdminControllers{
  deleteUser: DeleteUserController
  createPizza: CreatePizzaController
}