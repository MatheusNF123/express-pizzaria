import { SafeParseError, Schema } from "zod";
import CustomError from "../Error/CustomError";
import ISchemas from "../Interfaces/ISchemas";
import { IUser } from "../Interfaces/IUser";
import IValidation from "../Interfaces/IValidation";

export default class Validations implements IValidation {
  constructor(private schemas: ISchemas<Schema>) {}
  public validateUserDTO(userDTO: IUser): void {
    this.schemas.userSchema.parse(userDTO);
  }
}
