import { Schema, ZodError } from "zod";
import CustomError from "../Error/CustomError";
import ISchemas from "../Interfaces/ISchemas";
import IUser from "../Interfaces/IUser";
import IValidation from "../Interfaces/IValidation";

export default class Validations implements IValidation {
  constructor(private schemas: ISchemas<Schema>) {}
  public validateUserDTO(userDTO: IUser): void {
    const result = this.schemas.userSchema.safeParse(userDTO);

    if (!result.success) {
      const message = result.error.issues.map((err) => err.message).join("\n");
      throw new CustomError(message, 400);
    }
  }
}
