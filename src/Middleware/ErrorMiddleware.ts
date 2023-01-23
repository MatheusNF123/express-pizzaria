import { ZodError } from "zod";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "../Error/CustomError";

export default class MiddleError {
  static errorMiddleware: ErrorRequestHandler = (
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {

    if (err instanceof ZodError) {
      const message = err.issues.map((err) => err.message);
      return res.status(400).json({ message });
    }
    return res.status(err.status || 500).json({ message: err.message });
  };
}
