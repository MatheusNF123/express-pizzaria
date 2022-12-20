import { IUser } from "./IUser";
import { IOrderDTO } from "./IOrder";

export default interface IValidation {
  validateUserDTO(userDTO: IUser): void;
  validateOrderDTO(OrderDTO: IOrderDTO): void;
}
