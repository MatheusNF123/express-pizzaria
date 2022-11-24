import IUser from "./IUser";

export default interface IValidation {
  validateUserDTO(userDTO: IUser): void;
}
