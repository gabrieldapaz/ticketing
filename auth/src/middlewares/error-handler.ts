import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../erros/request-validation-error';
import { DatabaseConnectionError } from '../erros/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).send({
    message: err.message,
  });
};
