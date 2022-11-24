import * as bcrypt from 'bcryptjs';
import {IUserRepository} from "../../Repository/IRepository"
import { ILogin } from "../../Interfaces/IUser"
import CustomError from "../../Error/CustomError";
import Token from '../../utils/GenerateToken';

export default class MakeLoginService {
  constructor(private userRepository: IUserRepository){}

  public login = async({email, password}:ILogin):Promise<string> => {
    const user = await this.userRepository.findEmail(email);
    if (!user) throw new CustomError('Incorrect email or password', 401);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new CustomError('Incorrect email or password', 401);

    const token = Token.generateToken({id: user.id, email });

    return token
  }
}