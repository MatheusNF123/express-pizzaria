import CreateUserController from "../UseCases/UserUseCase/createUser/CreateUserController";
import MakeLoginController from "../UseCases/UserUseCase/makeLogin/MakeLoginController";
import UpdateUserController from "../UseCases/UserUseCase/updateUser/UpdateUserController";
import DeleteUserController from "../UseCases/UserUseCase/deleteUser/DeleteUserController";
import GetUserController from "../UseCases/UserUseCase/getUser/GetUserController";

export default interface IUserControllers {
  makeLogin: MakeLoginController;
  createUser: CreateUserController;
  updateUser: UpdateUserController;
  deleteUser: DeleteUserController;
  getUser: GetUserController;
}
