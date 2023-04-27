import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import CustomError from '../Error/CustomError';
import { IUser } from '../Interfaces/IUser';

const secretKey = process.env.JWT_SECRET || 'jwt_secret' as string;

export default class Token {
  static generateToken = (payload: JwtPayload): string => {

    const token = jwt.sign(payload, secretKey, { expiresIn: '20h' });
    return token;
  };

  static authToken = (token: string): IUser => {
    if (!token) {
      throw new CustomError('Token must be a valid token', 401);
    }

    try {
      const verificaToken = jwt.verify(token, secretKey)
      const { id, email, role } = verificaToken as IUser
      return { id, email, role } as IUser
    } catch (error) {
      throw new CustomError('Token must be a valid token', 401);
    }
  };
}
