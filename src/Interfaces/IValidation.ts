import { ILogin, IUser } from "./IUser";
import { IOrderDTO, ISaleInfo } from "./IOrder";
import IPizza from "./IPizza";
import { ICartDTO, ICartItemDTO } from "./ICart";

export default interface IValidation {
  validateUserDTO(userDTO: IUser): void;
  validateLoginUserDTO(userDTO: ILogin): void;
  validateOrderDTO(OrderDTO: IOrderDTO): void;
  validateCartDTO(cartDTO: ICartDTO): void;
  validateCartItemDTO(cartItemDTO: ICartItemDTO): void;
  validatePizzaDTO(pizzaDTO: IPizza): void;
  validatePizzaUpdateDTO(pizzaDTO: IPizza): void;
  validateUserUpdateDTO(userDTO: IUser): void;
  validateUpdateCartItemDTO(cartItemDTO: ISaleInfo): void;
}
