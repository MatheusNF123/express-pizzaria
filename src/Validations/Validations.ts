import { Schema } from "zod";
import ISchemas from "../Interfaces/ISchemas";
import IUser from "../Interfaces/IUser";
import IValidation from "../Interfaces/IValidation";

export default class Validations implements IValidation {
  constructor(private schemas: ISchemas<Schema>) { }
  public validateUserDTO(userDTO: IUser): boolean {
    this.schemas.userSchema.safeParse(userDTO);
  }
}