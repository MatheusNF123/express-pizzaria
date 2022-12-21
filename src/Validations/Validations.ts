import { Schema } from "zod";
import ISchemas from "../Interfaces/ISchemas";
import { IUser } from "../Interfaces/IUser";
import { IOrderDTO } from "../Interfaces/IOrder";
import IValidation from "../Interfaces/IValidation";
import IPizza from "../Interfaces/IPizza";

export default class Validations implements IValidation {
  constructor(private schemas: ISchemas<Schema>) {}
  public validateUserDTO(userDTO: IUser): void {
    this.schemas.userSchema.parse(userDTO);
  }

  public validateUserUpdateDTO(userDTO: IUser): void {
    this.schemas.userUpdateSchema.parse(userDTO);
  }

  public validateOrderDTO(orderDTO: IOrderDTO): void {
    this.schemas.orderSchema.parse(orderDTO);
  }

  public validatePizzaDTO(pizzaDTO: IPizza): void {
    this.schemas.pizzaSchema.parse(pizzaDTO);
  }

  public validatePizzaUpdateDTO(pizzaDTO: IPizza): void {
    this.schemas.pizzaUpdateSchema.parse(pizzaDTO);
  }
}
