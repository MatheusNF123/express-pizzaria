import CreateUserController from "../UseCases/UserUseCase/createUser/CreateUserController";
import MakeLoginController from "../UseCases/UserUseCase/makeLogin/MakeLoginController";
import UpdateUserController from "../UseCases/UserUseCase/updateUser/UpdateUserController";

export default interface IUserControllers {
  makeLogin: MakeLoginController;
  createUser: CreateUserController;
  updateUser: UpdateUserController;
}
