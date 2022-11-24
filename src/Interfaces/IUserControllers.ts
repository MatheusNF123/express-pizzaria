import CreateUserController from "../UseCases/UserUseCase/createUser/CreateUserController";
import MakeLoginController from "../UseCases/UserUseCase/makeLogin/MakeLoginController";

export default interface IUserControllers {
  makeLogin: MakeLoginController,
  createUser: CreateUserController,
}
