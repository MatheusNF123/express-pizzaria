import { ILogin, IUser } from "./IUser";
import { IOrderDTO } from "./IOrder";
import IPizza from "./IPizza";
import { ICartDTO } from "./ICart";

export default interface IValidation {
  validateUserDTO(userDTO: IUser): void;
  validateLoginUserDTO(userDTO: ILogin): void;
  validateOrderDTO(OrderDTO: IOrderDTO): void;
  validateCartDTO(cartDTO: ICartDTO): void;
  validatePizzaDTO(pizzaDTO: IPizza): void;
  validatePizzaUpdateDTO(pizzaDTO: IPizza): void;
  validateUserUpdateDTO(userDTO: IUser): void;  
}
