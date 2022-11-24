import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import CustomError from '../Error/customError';

const secretKey = process.env.JWT_SECRET || 'jwt_secret' as string;

interface IRequest extends JwtPayload{
  id: number;
  email: string;
} 

export default class Token {
  static generateToken = (payload: JwtPayload): string => {
    
    const token = jwt.sign(payload, secretKey, {expiresIn: '20h'});
    return token;
  };

  static authToken = (req: Request, _res:Response, next:NextFunction): void => {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new CustomError('Token must be a valid token', 401);
    }

    try {
      const verificaToken = jwt.verify(authorization, secretKey) as IRequest;
      
      req.user = verificaToken;

      next();
    } catch (error) {
      throw new CustomError('Token must be a valid token', 401);
    }
  };
}
