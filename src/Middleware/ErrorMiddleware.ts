import { ZodError } from 'zod';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import CustomError from '../Error/CustomError';

export default class MiddleError {
  static errorMidleware: ErrorRequestHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    // console.log(`caiu no middleware de erro ${err.message}`);
   if(err instanceof ZodError){
    const error = err.issues.map((err) => err.message).join("\n");
    return res.status(400).json(error)    
   }
    return res.status(err.status || 500).json({ message: err.message });
    
  };
}
