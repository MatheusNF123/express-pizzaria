import { ILogin, IUser } from "./IUser";
import { IOrderDTO } from "./IOrder";
import IPizza from "./IPizza";

export default interface IValidation {
  validateUserDTO(userDTO: IUser): void;
  validateLoginUserDTO(userDTO: ILogin): void;
  validateOrderDTO(OrderDTO: IOrderDTO): void;
  validatePizzaDTO(pizzaDTO: IPizza): void;
  validatePizzaUpdateDTO(pizzaDTO: IPizza): void;
  validateUserUpdateDTO(userDTO: IUser): void;
}
