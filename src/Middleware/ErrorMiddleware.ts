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
    res.status(err.status || 500).json({ message: err.message });
    
  };
}
