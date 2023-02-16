import { IRepository } from "../../../Repository/IRepository";
import Token from "../../../utils/GenerateToken";
import CustomError from "../../../Error/CustomError";
import { IUser } from "../../../Interfaces/IUser";
import IValidation from "../../../Interfaces/IValidation";
import * as bcrypt from "bcryptjs";

export default class UpdateUserService {
  constructor(
    private repository: IRepository<IUser>,
    private validation: IValidation
  ) { }

  public async update(token: string, body: IUser) {
    const {id} = Token.authToken(token);

    this.validation.validateUserUpdateDTO(body);

    const user = await this.repository.findOne({ id });

    if (!user || user.id !== id) throw new CustomError("Usuário não existe", 401);

    if(body.password){      
      const password = await bcrypt.hash(body.password, 10);
      const updatedUser = await this.repository.update(user, {...body, password});
      updatedUser.password = undefined
      return updatedUser
    }   
    const updatedUser = await this.repository.update(user, body);
     updatedUser.password = undefined
     return updatedUser

    
  }
}
