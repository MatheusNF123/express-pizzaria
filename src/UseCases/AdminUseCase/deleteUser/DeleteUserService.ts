import { IUser } from './../../../Interfaces/IUser';
import { IRepository } from "../../../Repository/IRepository";
import Token from '../../../utils/GenerateToken';
import CustomError from '../../../Error/CustomError';

export default class DeleteUserService{
  constructor(private repository: IRepository<IUser>) {}

  public async delete(token:string, id: string) {

    const { role } = Token.authToken(token)

    if(role !== 'admin') throw new CustomError('Unauthorized', 401)

    const user = await this.repository.findOne({ id })

    if(!user) throw new CustomError('user does not exist', 401)

    await this.repository.delete(id);

    return { message: "deleted user" }
  }
}